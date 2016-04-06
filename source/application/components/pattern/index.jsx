import React, {PropTypes as types} from 'react';
import autobind from 'autobind-decorator';

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

class Pattern extends React.Component {
	displayName = 'Pattern';

	static propTypes = {
		id: types.string.isRequired,
		config: types.object.isRequired,
		manifest: types.object.isRequired,
		results: types.object.isRequired
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

	render() {
		const {
			id,
			manifest: {
				displayName,
				name,
				patterns,
				dependentPatterns,
				version
			},
			config: {
				fullscreenPatterns
			}
		} = this.props;

		const hasRelations = patterns.length > 0 ||
			Object.keys(dependentPatterns).length > 0;

		const results = [];
		const controls = [];

		const fullscreen = `/demo/${id}`;

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
			content = <PatternDemo target={id} />;
		} else {
			content = (
				<div className="pattern-fullscreen-message">
					{"This pattern is disabled in embedded view. Please open the "}
					<a href={fullscreen} target="_blank">fullscreen view</a>
					{" to display it."}
				</div>
			);
		}

		return (
			<div className="pattern">
				<Headline className="pattern-header" order={2}>
					<span className="pattern-name">{displayName || name}</span>
					<small className="pattern-version">v{version}</small>
				</Headline>
				{content}
				<div className="pattern-toolbar">
					{controls}
					<button className="pattern-control pattern-tool" type="button"
						onClick={this.handleClick}
						disabled={this.state.active.length === 0}
						>
							Close all
					</button>
					<div className="pattern-tools">
						{
							hasRelations &&
								<PatternControl
									className="pattern-tool"
									id={`${id}/dependencies-control`}
									key={`${id}/dependencies-control`}
									target={`${id}/dependencies-state`}
									active={this.state.active.indexOf(`${id}/dependencies-state`) > -1}
									name={<Icon symbol="dependencies" />}
									/>
						}
						<a className="pattern-control pattern-tool" href={fullscreen} target="_blank">
							<Icon symbol="fullscreen" />
						</a>
					</div>
				</div>
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
