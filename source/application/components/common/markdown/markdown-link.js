import url from 'url';
import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';

export default MarkdownLink;

function MarkdownLink(props) {
	const parsed = url.parse(props.href);
	const isAbsolute = Boolean(parsed.protocol);

	if (isAbsolute) {
		return (
			<a
				href={props.href}
				className="link link--external"
				rel="noopener"
				target="_blank"
				title={props.title || `Open ${props.href} in a new tab`}
				>
				{props.children}
			</a>
		);
	}

	const to = {
		pathname: [props.base, parsed.pathname].filter(Boolean).join(''),
		query: props.query,
		hash: parsed.hash
	};
	return (
		<Link
			title={props.title || `Navigate to ${to.pathname}`}
			to={to}
			>
			{props.children}
		</Link>
	);
}

MarkdownLink.propTypes = {
	base: t.string.isRequired,
	children: t.any,
	href: t.string.isRequired,
	query: t.object.isRequired,
	title: t.string
};
