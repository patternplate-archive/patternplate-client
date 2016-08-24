import React, {PropTypes as t} from 'react';

import Markdown from '../common/markdown';

function PatternDocumentation(props) {
	const source = props.source || props.children;
	return (
		<div className="pattern-code">
			<div className="pattern-code__toolbar">
				<div className="pattern-code__name">{props.name}</div>
			</div>
			<div className="pattern-code__content">
				<Markdown base={props.base} source={source}/>
			</div>
		</div>
	);
}

PatternDocumentation.propTypes = {
	base: t.string.isRequired,
	children: t.string,
	name: t.string.isRequired,
	source: t.string
};

export default PatternDocumentation;
