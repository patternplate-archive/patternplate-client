import React, {PropTypes as t} from 'react';

export default MarkdownCode;

function MarkdownCode(props) {
	// TODO: get language from props and hightlight
	return (
		<code>
			{props.children}
		</code>
	);
}

MarkdownCode.propTypes = {
	children: t.any.isRequired
};
