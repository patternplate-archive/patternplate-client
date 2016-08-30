import React, {PropTypes as t} from 'react';

import PatternToolCodeToogle from './pattern-tool-code-toggle';
import PatternToolEnvironmentSelection from './pattern-tool-environment-selection';
import PatternToolFullscsreen from './pattern-tool-fullscreen';
import PatternToolRelations from './pattern-tool-relations';
import urlQuery from '../../utils/url-query';

export default PatternTools;

function PatternTools(props) {
	const hasEnvironments = props.environments.length > 1;
	const activeId = urlQuery.parse(props.activeSource).pathname;
	const active = activeId === 'relations';

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
				active={active}
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

PatternTools.propTypes = {
	activeSource: t.string.isRequired,
	base: t.string.isRequired,
	dependencies: t.array.isRequired,
	dependents: t.array.isRequired,
	environment: t.string.isRequired,
	environments: t.array.isRequired,
	expanded: t.bool.isRequired,
	hasCode: t.bool.isRequired,
	id: t.string.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}),
	name: t.string.isRequired,
	onEnvironmentChange: t.func.isRequired
};
