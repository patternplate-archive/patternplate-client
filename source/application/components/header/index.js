import React, {PropTypes as t} from 'react';
import {Link, IndexLink} from 'react-router';

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
				<Icon
					symbol={props.icon}
					fallback={false}
					>
					{props.title}
				</Icon>
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
