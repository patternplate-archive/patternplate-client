import React, {PropTypes as t} from 'react';

import PatternDemo from './pattern-demo';
import PatternHeader from './pattern-header';
import PatternToolbar from './pattern-toolbar';

export default Pattern;

function Pattern(props) {
	const onReloadClick = () => {
		return props.reload({
			base: props.base,
			id: props.id,
			query: {
				environment: props.environment
			}
		});
	};

	return (
		<div className="pattern">
			<PatternHeader
				base={props.base}
				flag={props.flag}
				id={props.id}
				loading={props.loading}
				location={props.location}
				name={props.name}
				onReloadClick={onReloadClick}
				reloading={props.reloading}
				reloadTime={props.reloadTime}
				tags={props.tags}
				version={props.version}
				/>
			<PatternDemo
				base={props.base}
				target={props.id}
				environment={props.environment}
				reloadTime={props.reloadTime}
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
				onConcernChange={props.onConcernChange}
				onEnvironmentChange={props.onEnvironmentChange}
				onFileRequest={props.onFileRequest}
				onTypeChange={props.onTypeChange}
				reloading={props.reloading}
				expanded={props.sourceExpanded}
				/>
		</div>
	);
}

Pattern.propTypes = {
	activeSource: t.string.isRequired,
	base: t.string.isRequired,
	code: t.arrayOf(t.shape({
		name: t.string.isRequired
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
	flag: t.string,
	id: t.string.isRequired,
	loading: t.bool.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}).isRequired,
	name: t.string.isRequired,
	onEnvironmentChange: t.func.isRequired,
	onConcernChange: t.func.isRequired,
	onFileRequest: t.func.isRequired,
	onTypeChange: t.func.isRequired,
	reload: t.func.isRequired,
	reloading: t.bool.isRequired,
	reloadTime: t.number.isRequired,
	tags: t.arrayOf(t.string).isRequired,
	version: t.string,
	sourceExpanded: t.bool
};
