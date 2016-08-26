import React, {PropTypes as t} from 'react';
import join from 'classnames';
import PatternSources from './pattern-sources';
import PatternTools from './pattern-tools';

export default PatternToolbar;

function PatternToolbar(props) {
	const className = join('pattern-toolbar', {
		'pattern-toolbar--expanded': props.expanded
	});

	return (
		<div className={className}>
			<PatternSources
				base={props.base}
				location={props.location}
				sources={props.code}
				/>
			<PatternTools
				activeSource={props.activeSource}
				base={props.base}
				dependencies={props.dependencies}
				dependents={props.dependents}
				environment={props.environment}
				environments={props.environments}
				expanded={props.expanded}
				hasCode={props.code.length > 0}
				id={props.id}
				name={props.name}
				location={props.location}
				onEnvironmentChange={props.onEnvironmentChange}
				/>
		</div>
	);
}

PatternToolbar.propTypes = {
	activeSource: t.string.isRequired,
	base: t.string.isRequired,
	code: t.arrayOf(t.object).isRequired,
	dependencies: t.arrayOf(t.shape({
		id: t.string.isRequired,
		localName: t.string.isRequired,
		name: t.string.isRequired,
		version: t.string.isRequired
	})).isRequired,
	dependents: t.arrayOf(t.shape({
		id: t.string.isRequired,
		name: t.string.isRequired,
		version: t.string.isRequired
	})).isRequired,
	environment: t.string.isRequired,
	environments: t.arrayOf(t.shape({
		id: t.string.isRequired,
		name: t.string.isRequired
	})).isRequired,
	expanded: t.bool.isRequired,
	id: t.string.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}).isRequired,
	name: t.string.isRequired,
	onEnvironmentChange: t.func.isRequired
};
