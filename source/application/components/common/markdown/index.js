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
				hash: props.hash,
				query: props.query,
				pathname: props.pathname,
				onHashChange: props.scrollTo
			})}
		</div>
	);
}

Markdown.propTypes = {
	base: t.string.isRequired,
	className: t.string,
	hash: t.string.isRequired,
	pathname: t.string.isRequired,
	query: t.object.isRequired,
	scrollTo: t.func.isRequired,
	source: t.string
};
