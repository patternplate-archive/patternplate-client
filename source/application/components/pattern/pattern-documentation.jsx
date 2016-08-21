import React, {PropTypes as t} from 'react';

import Markdown from '../common/markdown';

function PatternDocumentation(props) {
	return (
		<div className="pattern-documentation">
			<div className="pattern-code-toolbar">
				<div className="pattern-code-name">{props.name}</div>
			</div>
			<div className="pattern-code-content">
				<Markdown base={props.base} source={props.children}/>
			</div>
		</div>
	);
}

PatternDocumentation.propTypes = {
	base: t.string.isRequired,
	children: t.string.isRequired,
	name: t.string.isRequired
};

export default PatternDocumentation;
