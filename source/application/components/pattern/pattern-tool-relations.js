import React from 'react';
import Icon from '../common/icon';
import PatternCode from './pattern-code';
import PatternControl from './pattern-control';
import PatternDependencies from './pattern-dependencies';

export default PatternToolRelations;

function PatternToolRelations(props) {
	return (
		<div className="pattern-tool pattern-tool--relations">
			<PatternControl
				active={props.active}
				base={props.base}
				location={props.location}
				shortid="relations"
				id="relations"
				name="relations"
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
