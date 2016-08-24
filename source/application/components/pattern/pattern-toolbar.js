import React from 'react';
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
