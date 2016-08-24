import React from 'react';

import PatternToolCodeToogle from './pattern-tool-code-toggle';
import PatternToolEnvironmentSelection from './pattern-tool-environment-selection';
import PatternToolFullscsreen from './pattern-tool-fullscreen';
import PatternToolRelations from './pattern-tool-relations';

import urlQuery from '../../utils/url-query';

export default PatternTools;

function PatternTools(props) {
	const hasEnvironments = props.environments.length > 1;

	return (
		<div className="pattern-tools">
			{
				props.hasCode &&
					<PatternToolCodeToogle
						active={props.expanded}
						base={props.base}
						location={props.location}
						/>
			}
			<PatternToolEnvironmentSelection
				base={props.base}
				disabled={!hasEnvironments}
				environment={props.environment}
				environments={props.environments}
				onChange={props.onEnvironmentChange}
				/>
			<PatternToolRelations
				active={props.activeSource === 'relations'}
				base={props.base}
				dependencies={props.dependencies}
				dependents={props.dependents}
				id={props.id}
				location={props.location}
				name={props.name}
				/>
			<PatternToolFullscsreen
				base={props.base}
				environment={props.environment}
				id={props.id}
				/>
		</div>
	);
}
