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
				reloading={props.reloading}
				tags={props.tags}
				version={props.version}
				onReloadClick={onReloadClick}
				/>
			<PatternDemo
				base={props.base}
				target={props.id}
				environment={props.environment}
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
				onEnvironmentChange={props.onEnvironmentChange}
				onFileRequest={props.onFileRequest}
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
	onFileRequest: t.func.isRequired,
	reload: t.func.isRequired,
	reloading: t.bool.isRequired,
	tags: t.arrayOf(t.string).isRequired,
	version: t.string,
	sourceExpanded: t.bool
};
