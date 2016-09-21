import join from 'classnames';
import React, {PropTypes as t} from 'react';

import highlight from './highlight';
import toElements from './to-elements';

export default Code;

function Code(props) {
	const className = join('code hljs', `hljs-${props.language}`);
	const source = highlightCode(props.language, props.children);

	return (
		<code className={className}>
			{source}
		</code>
	);
}

Code.propTypes = {
	language: t.string.isRequired,
	children: t.string.isRequired
};

function highlightCode(language, source = '') {
	if (!language) {
		return source;
	}
	if (!source) {
		return source;
	}
	const hast = highlight(language, source);
	return toElements(hast);
}
