import querystring from 'querystring';

import React, {PropTypes as types} from 'react';
import {HistoryLocation, Link} from 'react-router';
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
		environment: types.string.isRequired
	};

	static defaultProps = {
		environment: 'index'
	};

	state = {
		active: []
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
				format: result[formatKey] || 'html',
				content: result[contentKey]
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
		const active = this.state.active.slice(0);
		const index = active.indexOf(id);

		if (checked && index === -1) {
			active.push(id);
		} else if (index !== -1) {
			active.splice(index, 1);
		}

		this.setState({
			active
		});
	}

	closeControls(ids = this.state.active) {
		const diff = this.state.active.filter(id => ids.indexOf(id) === -1);

		this.setState({
			active: diff
		});
	}

	@autobind
	handleChange(e) {
		this.updateControls(e.target.id, e.target.checked);
	}

	@autobind
	handleClick() {
		this.closeControls();
	}

	@autobind
	handleEnvironmentChange({target: {value}}) {
		const {location: {search = ''}} = global;
		const current = querystring.parse(search.slice(1));
		const result = merge({}, current, {environment: value});

		const query = querystring.stringify(result);
		const searchstring = query.length > 0 ?
			`?${query}` :
			'';

		HistoryLocation.push(searchstring);
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
			}
		} = this.props;

		const hasRelations = Object.keys(patterns).length > 0 ||
			Object.keys(dependentPatterns).length > 0;

		const results = [];
		const controls = [];

		const fullscreen = [
			`/demo/${id}`,
			querystring.stringify({environment})
		].join('?');

		for (const item of this.items) {
			const isDoc = (item.name === 'Documentation' || item.name === 'Dependencies');
			const isActive = this.state.active.indexOf(item.id) > -1;

			if (item.content.length === 0) {
				continue;
			}

			results.push(
				<input
					className="pattern-state"
					type="checkbox"
					id={item.id}
					key={item.controlKey}
					checked={isActive}
					onChange={this.handleChange}
					/>
				);
			results.push(isDoc ?
				<PatternDocumentation {...item}>
					{item.content}
				</PatternDocumentation> :
				<PatternCode {...item}>
					{item.content}
				</PatternCode>
			);
			controls.push(
				<PatternControl
					{...item}
					id={item.controlKey}
					key={item.controlKey}
					target={item.key}
					active={isActive}
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
					{
						flag &&
							<small className={flagClassName}>
								<Link
									to="pattern"
									params={{splat: id}}
									query={{search: `flag:${flag}`}}
									title={`Search patterns with flag ${flag}`}
									>
									{flag}
								</Link>
							</small>
					}
					{
						tags.length > 0 &&
							<ul className="pattern-tags">
								{
									tags.map((tag, key) =>
										<small className="pattern-tag" key={key}>
											<Link
												to="pattern"
												params={{splat: id}}
												query={{search: `tag:${tag}`}}
												title={`Search patterns with tag ${tag}`}
												>
												{tag}
											</Link>
										</small>
									)
								}
							</ul>
					}
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
										id={`${id}/dependencies-control`}
										key={`${id}/dependencies-control`}
										target={`${id}/dependencies-state`}
										active={this.state.active.indexOf(`${id}/dependencies-state`) > -1}
										name={<Icon symbol="dependencies"/>}
										/>
							}
							<a className="pattern-control pattern-tool" href={fullscreen} target="_blank">
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
									checked={this.state.active.indexOf(`${id}/dependencies-state`) > -1}
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
