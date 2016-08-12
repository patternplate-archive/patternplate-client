import React, {PropTypes as types} from 'react';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';
import cx from 'classnames';
import pure from 'pure-render-decorator';
import {merge} from 'lodash';

import CSSTransitionGroup from 'react-addons-css-transition-group';

import PatternCode from './pattern-code';
import PatternDependencies from './pattern-dependencies';
import PatternDocumentation from './pattern-documentation';
import PatternControl from './pattern-control';
import PatternDemo from './pattern-demo';

import Headline from '../common/headline';
import Icon from '../common/icon';
import urlQuery from '../../utils/url-query';

const formatMap = {
	source: 'in',
	buffer: 'out',
	demoSource: 'in',
	demoBuffer: 'out'
};

@pure
class Pattern extends React.Component {
	displayName = 'Pattern';

	static propTypes = {
		id: types.string.isRequired,
		config: types.object.isRequired,
		manifest: types.object.isRequired,
		results: types.object.isRequired,
		environment: types.string.isRequired,
		onEnvironmentChange: types.func.isRequired,
		location: types.object.isRequired
	};

	static defaultProps = {
		environment: 'index',
		onEnvironmentChange: () => {}
	};

	static contextTypes = {
		router: types.any
	};

	comprehend(results, id) {
		const items = [];

		if (!results) {
			return [];
		}

		if (!results.index) {
			return [];
		}

		for (const resultName of Object.keys(results.index)) {
			const resultConfig = this.props.config.results[resultName];

			if (!resultConfig) {
				continue;
			}

			const result = results.index[resultName];
			const name = resultConfig.name || resultName;
			const keys = Array.isArray(resultConfig.use) ?
				resultConfig.use :
				[resultConfig.use];

			const [contentKey] = keys.filter(key => result[key]);

			const formatKey = formatMap[contentKey];

			if (typeof result !== 'object' || typeof contentKey === 'undefined') {
				continue;
			}

			items.push({
				name,
				key: [id, name].join('/'),
				controlKey: [id, name, 'control'].join('/'),
				id: [id, name].join('/'),
				shortid: name.toLowerCase(),
				format: result[formatKey] || 'html',
				content: result[contentKey],
				source: result.source
			});
		}

		return items;
	}

	componentWillMount() {
		this.items = this.comprehend(this.props.results, this.props.id);
	}

	componentWillReceiveProps(props) {
		this.items = this.comprehend(props.results, props.id);
	}

	updateControls(id, checked) {
		const {location} = this.props;
		const fragments = id.split('/').filter(Boolean);
		const shortid = fragments[fragments.length - 1].toLowerCase();
		this.context.router.push({
			pathname: location.pathname,
			query: {...location.query, source: checked ? shortid : null}
		});
	}

	@autobind
	handleChange(e) {
		this.updateControls(e.target.id, e.target.checked);
	}

	@autobind
	handleEnvironmentChange({target: {value}}) {
		const {location} = this.props;
		const {query} = location;
		const parsed = urlQuery.parse(location.pathname);
		const result = merge({}, parsed, {query: {environment: value}});
		const pathname = urlQuery.format(result);
		this.context.router.push({pathname, query});
	}

	render() {
		const {
			id,
			environment,
			manifest: {
				demoEnvironments = [],
				displayName,
				name,
				patterns,
				dependentPatterns,
				tags = [],
				flag,
				version
			},
			config: {
				fullscreenPatterns
			},
			location
		} = this.props;

		const hasRelations = Object.keys(patterns).length > 0 ||
			Object.keys(dependentPatterns).length > 0;

		const results = [];
		const controls = [];

		const fullscreen = urlQuery.format({
			pathname: `/demo/${id}/index.html`,
			query: {environment}
		});

		for (const item of this.items) {
			const isDoc = (item.name === 'Documentation' || item.name === 'Dependencies');
			const isActive = item.shortid === location.query.source;

			if (item.content.length === 0) {
				continue;
			}

			results.push(
				<input
					className="pattern-state"
					type="checkbox"
					name="pattern-content"
					id={item.id}
					key={item.controlKey}
					checked={isActive}
					onChange={this.handleChange}
					/>
				);
			results.push(isDoc ?
				<PatternDocumentation {...item}>
					{item.source}
				</PatternDocumentation> :
				<PatternCode {...item}>
					{item.content}
				</PatternCode>
			);
			controls.push(
				<PatternControl
					key={item.controlKey}
					active={isActive}
					name={item.name}
					shortid={item.shortid}
					location={location}
					/>
				);
		}

		const allowFullscreen = fullscreenPatterns.every(rule => {
			return !id.match(new RegExp(rule));
		});

		let content;

		if (allowFullscreen) {
			content = <PatternDemo environment={environment} target={id}/>;
		} else {
			content = (
				<div className="pattern-fullscreen-message">
					{"This pattern is disabled in embedded view. Please open the "}
					<a href={fullscreen} target="_blank">fullscreen view</a>
					{" to display it."}
				</div>
			);
		}

		const flagClassName = cx(`pattern__flag`, {
			[`pattern__flag--${flag}`]: flag
		});

		return (
			<div className="pattern">
				<Headline className="pattern-header" order={2}>
					<span className="pattern-name">{displayName || name}</span>
					<small className="pattern-version">v{version}</small>
				</Headline>
				{content}
				<CSSTransitionGroup
					component="div"
					className="pattern-toolbar"
					transitionName="pattern-toolbar"
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}
					>
					<div className="pattern-toolbar-container" key="toolbar">
						{controls}
						<div className="pattern-tools">
							{
								demoEnvironments.length > 1 &&
									<label className="pattern-selection">
										<select
											className="native"
											onChange={this.handleEnvironmentChange}
											value={environment}
											title={`Change environment for pattern ${id}`}
											>
											{
												demoEnvironments
													.map(env => {
														return (
															<option
																key={env.name}
																value={env.name}
																>
																{env.displayName || env.name}
															</option>
														);
													})
											}
										</select>
										<Icon symbol="environment"/>
									</label>
							}
							{
								hasRelations &&
									<PatternControl
										className="pattern-tool"
										shortid="dependencies-state"
										active={location.query.source === 'dependencies-state'}
										name={<Icon symbol="dependencies"/>}
										title={`Show dependencies for pattern ${id}`}
										location={location}
										/>
							}
							<a
								className="pattern-control pattern-tool"
								href={fullscreen}
								target="_blank"
								title={`Show fullscreen demo for pattern ${id}`}
								rel="nofollow"
								>
								<Icon symbol="fullscreen"/>
							</a>
						</div>
					</div>
				</CSSTransitionGroup>
				<div className="pattern-content">
					{results}
					{
						hasRelations &&
							[
								<input
									className="pattern-state"
									type="checkbox"
									id={`${id}/dependencies-state`}
									key={`${id}/dependencies-state`}
									checked={location.query.source === 'dependencies-state'}
									onChange={this.handleChange}
									/>,
								<PatternCode
									name="Dependencies"
									highlight={false}
									key={`${id}/dependencies`}
									>
									<PatternDependencies
										className="hljs"
										data={this.props}
										/>
								</PatternCode>
							]
					}
				</div>
			</div>
		);
	}
}

export default Pattern;
