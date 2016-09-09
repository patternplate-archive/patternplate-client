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
	hash: t.string.isRequired,
	className: t.string,
	query: t.object.isRequired,
	pathname: t.string.isRequired,
	source: t.string,
	scrollTo: t.func.isRequired
};
