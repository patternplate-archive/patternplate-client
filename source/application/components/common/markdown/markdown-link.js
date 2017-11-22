import url from 'url';
import React, {Component, PropTypes as t} from 'react';
import {Link} from '@marionebl/react-router';

export default class MarkdownLink extends Component {
	static propTypes = {
		base: t.string.isRequired,
		children: t.any,
		hash: t.string.isRequired,
		href: t.string.isRequired,
		onHashChange: t.func.isRequired,
		pathname: t.string.isRequired,
		query: t.object.isRequired,
		title: t.string
	};

	static defaultProps = {
		onHashChange: () => {}
	};

	componentDidMount() {
		const {props} = this;
		const parsed = url.parse(props.href);
		const pathname = parsed.pathname || '/';
		const hasHash = Boolean(parsed.hash);
		const isSamePathname = !parsed.pathname || props.pathname === pathname;
		const isSameHash = hasHash && isSamePathname && props.hash === parsed.hash;

		if (isSameHash) {
			props.onHashChange(parsed.hash.slice(1));
		}
	}

	render() {
		const {props} = this;
		const parsed = url.parse(props.href);
		const pathname = parsed.pathname || '/';
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

		const hasHash = Boolean(parsed.hash);
		const isSamePathname = !parsed.pathname || props.pathname === pathname;

		const to = {
			pathname: hasHash && isSamePathname ?
				`${props.base}` :
				`/${[props.base, parsed.pathname].join('').split('/').filter(Boolean).join('/')}`,
			query: props.query,
			hash: parsed.hash
		};

		const title = hasHash && isSamePathname ?
			`Jump to ${to.hash.slice(1)}` :
			`Navigate to ${to.pathname}`;

		const onClick = () => {
			if (hasHash && isSamePathname) {
				props.onHashChange(to.hash.slice(1));
			}
		};

		return (
			<Link
				onClick={onClick}
				title={props.title || title}
				to={to}
				>
				{props.children}
			</Link>
		);
	}
}
