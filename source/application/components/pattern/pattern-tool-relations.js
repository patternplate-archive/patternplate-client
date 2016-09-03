import React, {PropTypes as t} from 'react';
import Icon from '../common/icon';
import PatternControl from './pattern-control';
import PatternDependencies from './pattern-dependencies';

export default PatternToolRelations;

function PatternToolRelations(props) {
	const relationCount = props.dependencies.length + props.dependents.length;
	const title = `Browse relations of ${props.id} to ${relationCount} other patterns`;
	return (
		<div className="pattern-tool pattern-tool--relations">
			<PatternControl
				active={props.active}
				base={props.base}
				location={props.location}
				shortid="relations"
				id="relations"
				name="relations"
				title={title}
				>
				<Icon
					base={props.base}
					symbol="dependencies"
					description="Relations"
					/>
			</PatternControl>
			{
				props.active &&
					<div className="pattern-code pattern-code--max">
						<div className="pattern-code__toolbar">
							<div className="pattern-code__name">Relations</div>
						</div>
						<div className="pattern-code__content">
							<PatternDependencies
								base={props.base}
								dependencies={props.dependencies}
								dependents={props.dependents}
								id={props.id}
								name={props.name}
								location={props.location}
								/>
						</div>
					</div>
				}
		</div>
	);
}

PatternToolRelations.propTypes = {
	active: t.bool.isRequired,
	base: t.string.isRequired,
	dependencies: t.array.isRequired,
	dependents: t.array.isRequired,
	id: t.string.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}).isRequired,
	name: t.string.isRequired
};
