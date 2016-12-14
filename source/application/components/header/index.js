import React, {PropTypes as t} from 'react';
import {Link, IndexLink} from 'react-router';
import {camelCase, keys} from 'lodash';
import unified from 'unified';
import parse from 'rehype-parse';
import select from 'unist-util-select';
import toh from 'hast-to-hyperscript';

import Icon from '../common/icon';

export default Header;

function Header(props) {
	const to = {pathname: props.base, query: props.query};
	const enabledTo = {
		pathname: props.pathname,
		query: {
			...props.query,
			'menu-enabled': !props.menuEnabled
		}
	};

	return (
		<header className="main-header application__header">
			<IndexLink
				to={to}
				title="Navigate to documentation [ctrl+d]"
				className="logo"
				>
				<LiteralIcon icon={props.icon}/>
				<span className="main-header__title">
					{props.title}
				</span>
			</IndexLink>
			<div className="toolbar">
				<Link
					className="menu"
					to={enabledTo}
					>
					<Icon
						base={props.base}
						symbol="patternplate"
						fallback={false}
						>
						{
							props.menuEnabled ?
								'Disable Menu' :
								'Enable Menu'
						}
					</Icon>
				</Link>
			</div>
		</header>
	);
}

Header.propTypes = {
	base: t.string.isRequired,
	icon: t.string.isRequired,
	menuEnabled: t.bool.isRequired,
	pathname: t.string.isRequired,
	query: t.object.isRequired,
	title: t.string.isRequired,
	version: t.string.isRequired
};

function LiteralIcon(props) {
	const parsed = props.icon.trim().startsWith('<svg') ? toSVGElement(props.icon) : null;
	const dim = parsed ? {width: `${parsed.props.width}px`, height: `${parsed.props.height}px`} : null;
	return props.icon.trim().startsWith('<svg') ?
		<div className="icon"><div className="svg-icon" style={dim}>{parsed}</div></div> :
		<Icon symbol={props.icon} fallback={false}/>;
}

LiteralIcon.propTypes = {
	icon: t.string.isRequired
};

function toSVGElement(input) {
	const ast = unified()
		.use(parse)
		.parse(input);
	const svg = select(ast, '*').find(e => e.tagName === 'svg');
	const el = toh(React.createElement, svg);
	const props = keys(el.props).reduce((props, prop) => {
		props[camelCase(prop)] = el.props[prop];
		return props;
	}, {});
	return Object.assign({}, el, {props});
}
