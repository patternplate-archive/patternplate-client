import React, {PropTypes as t} from 'react';

export default MarkdownHeadline;

function MarkdownHeadline(props) {
	const {tagName: TagName, ...p} = props;
	const children = Array.isArray(p.children) ? p.children.join('') : p.children;
	const id = (children || '').split(' ').join('-').toLowerCase();

	return (
		<TagName id={id}>
			{props.children}
		</TagName>
	);
}

MarkdownHeadline.propTypes = {
	children: t.any.isRequired,
	tagName: t.string.isRequired
};
