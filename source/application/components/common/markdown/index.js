import React, {PropTypes as t} from 'react';
import join from 'classnames';
import render from './render';
export default Markdown;

function Markdown(props) {
	const className = join('markdown', props.className);
	return (
		<div className={className}>
			{render(props.source, {
				base: props.base,
				query: props.query
			})}
		</div>
	);
}

Markdown.propTypes = {
	base: t.string.isRequired,
	className: t.string,
	query: t.object.isRequired,
	source: t.string.isRequired
};
