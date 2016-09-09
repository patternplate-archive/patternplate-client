import React, {PropTypes as t} from 'react';

export default MarkdownCode;

function MarkdownCode(props) {
	return (
		<code {...props}>
			{props.children}
		</code>
	);
}

MarkdownCode.propTypes = {
	children: t.any.isRequired
};
