import React, {PropTypes as t} from 'react';

import PatternDemo from './pattern-demo';
import PatternHeader from './pattern-header';
import PatternToolbar from './pattern-toolbar';
import unwrap from '../../utils/unwrap';

export default class Pattern extends React.Component {
	componentDidMount() {
		this.props.onMount();
	}

	render() {
		const {props} = this;
		const onConcernChange = unwrap(props.onConcernChange, 'target.value');
		const onEnvironmentChange = unwrap(props.onEnvironmentChange, 'target.value');
		const onTypeChange = unwrap(props.onTypeChange, 'target.value');

		return (
			<div className="pattern-section">
				<div className="pattern">
					<PatternHeader
						automount={props.automount}
						base={props.base}
						breadcrumbs={props.breadcrumbs}
						environment={props.environment}
						errored={props.errored}
						flag={props.flag}
						id={props.id}
						loading={props.loading}
						location={props.location}
						name={props.name}
						opacity={props.opacity}
						reloadTime={props.reloadTime}
						reloadedTime={props.reloadedTime}
						rulers={props.rulers}
						tags={props.tags}
						version={props.version}
						/>
					<PatternDemo
						base={props.base}
						contentHeight={props.demoContentHeight}
						contentWidth={props.demoContentWidth}
						environment={props.environment}
						height={props.demoHeight}
						loading={props.loading}
						onError={props.onDemoError}
						onReady={props.onDemoReady}
						onResize={props.onDemoContentResize}
						onScroll={props.onDemoScroll}
						opacity={props.opacity}
						reloadTime={props.reloadTime}
						resize={props.resize}
						resizeable={props.rulers}
						rulerLengthX={props.rulerLengthX}
						rulerLengthY={props.rulerLengthY}
						rulers={props.rulers}
						rulerX={props.rulerX}
						rulerY={props.rulerY}
						target={props.id}
						width={props.demoWidth}
						/>
					<PatternToolbar
						activeSource={props.activeSource}
						base={props.base}
						code={props.code}
						dependencies={props.dependencies}
						dependents={props.dependents}
						environment={props.environment}
						environments={props.environments}
						id={props.id}
						loading={props.loading}
						location={props.location}
						name={props.name}
						onConcernChange={onConcernChange}
						onEnvironmentChange={onEnvironmentChange}
						onFileRequest={props.onFileRequest}
						onTypeChange={onTypeChange}
						expanded={props.sourceExpanded}
						/>
				</div>
			</div>
		);
	}
}

Pattern.propTypes = {
	automount: t.bool.isRequired,
	activeSource: t.string.isRequired,
	base: t.string.isRequired,
	breadcrumbs: t.arrayOf(t.shape({
		id: t.string.isRequired,
		name: t.string.isRequired,
		target: t.shape({
			pathname: t.string.isRequired,
			query: t.object.isRequired
		}).isRequired
	})),
	code: t.arrayOf(t.shape({
		active: t.bool.isRequired,
		extname: t.string.isRequired,
		concern: t.string.isRequired,
		concerns: t.arrayOf(t.string).isRequired,
		id: t.string.isRequired,
		language: t.string.isRequired,
		name: t.string.isRequired,
		source: t.string,
		type: t.string,
		types: t.arrayOf(t.string).isRequired
	})).isRequired,
	demoContentWidth: t.number.isRequired,
	demoContentHeight: t.number.isRequired,
	demoWidth: t.number,
	demoHeight: t.number,
	dependencies: t.arrayOf(t.shape({
		id: t.string.isRequired,
		name: t.string.isRequired,
		localName: t.string.isRequired
	})).isRequired,
	dependents: t.arrayOf(t.shape({
		id: t.string.isRequired,
		name: t.string.isRequired
	})).isRequired,
	environment: t.string.isRequired,
	environments: t.arrayOf(t.shape({
		id: t.string.isRequired,
		name: t.string.isRequired
	})).isRequired,
	errored: t.bool.isRequired,
	flag: t.string,
	id: t.string.isRequired,
	loading: t.bool.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}).isRequired,
	name: t.string.isRequired,
	onDemoContentResize: t.func.isRequired,
	onDemoError: t.func.isRequired,
	onDemoReady: t.func.isRequired,
	onDemoScroll: t.func.isRequired,
	onEnvironmentChange: t.func.isRequired,
	onConcernChange: t.func.isRequired,
	onFileRequest: t.func.isRequired,
	onMount: t.func.isRequired,
	onTypeChange: t.func.isRequired,
	opacity: t.bool.isRequired,
	reload: t.func.isRequired,
	reloadTime: t.number,
	reloadedTime: t.number,
	resize: t.func.isRequired,
	rulers: t.bool.isRequired,
	rulerX: t.number.isRequired,
	rulerY: t.number.isRequired,
	rulerLengthX: t.number.isRequired,
	rulerLengthY: t.number.isRequired,
	tags: t.arrayOf(t.string).isRequired,
	version: t.string,
	sourceExpanded: t.bool
};
