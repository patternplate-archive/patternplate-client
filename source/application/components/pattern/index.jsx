import React, {PropTypes as t} from 'react';

import PatternDemo from './pattern-demo';
import PatternHeader from './pattern-header';
import PatternToolbar from './pattern-toolbar';
import unwrap from '../../utils/unwrap';

export default Pattern;

function Pattern(props) {
	const onReloadClick = props.reload;

	const onConcernChange = unwrap(props.onConcernChange, 'target.value');
	const onEnvironmentChange = unwrap(props.onEnvironmentChange, 'target.value');
	const onTypeChange = unwrap(props.onTypeChange, 'target.value');

	return (
		<div className="pattern">
			<PatternHeader
				base={props.base}
				environment={props.environment}
				errored={props.errored}
				flag={props.flag}
				id={props.id}
				loading={props.loading}
				location={props.location}
				name={props.name}
				opacity={props.opacity}
				onReloadClick={onReloadClick}
				reloadTime={props.reloadTime}
				reloadedTime={props.reloadedTime}
				tags={props.tags}
				version={props.version}
				/>
			<PatternDemo
				base={props.base}
				environment={props.environment}
				loading={props.loading}
				onError={props.onDemoError}
				onReady={props.onDemoReady}
				opacity={props.opacity}
				reloadTime={props.reloadTime}
				target={props.id}
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
	);
}

Pattern.propTypes = {
	activeSource: t.string.isRequired,
	base: t.string.isRequired,
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
	onDemoError: t.func.isRequired,
	onDemoReady: t.func.isRequired,
	onEnvironmentChange: t.func.isRequired,
	onConcernChange: t.func.isRequired,
	onFileRequest: t.func.isRequired,
	onTypeChange: t.func.isRequired,
	opacity: t.bool.isRequired,
	reload: t.func.isRequired,
	reloadTime: t.number,
	reloadedTime: t.number,
	tags: t.arrayOf(t.string).isRequired,
	version: t.string,
	sourceExpanded: t.bool
};
