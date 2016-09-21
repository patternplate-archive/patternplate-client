import React, {PropTypes as t} from 'react';
import Code from '../code';

export default MarkdownCode;

function MarkdownCode(props) {
	const language = parseLanguage(props.className);

	if (!language) {
		return (
			<code>
				{props.children}
			</code>
		);
	}

	const source = props.children.join('');
	return (
		<Code language={language}>
			{source}
		</Code>
	);
}

MarkdownCode.propTypes = {
	children: t.any.isRequired,
	className: t.string
};

function parseLanguage(classNames = '') {
	const matches = classNames.split(' ')
		.map(className => className.split('-'))
		.filter(entry => entry[0] === 'language')
		.map(entry => entry[1]);
	return matches[0];
}
