import React, {PropTypes as t} from 'react';
import {Link, IndexLink} from 'react-router';

import Icon from '../common/icon';

export default Header;

function Header(props) {
	return (
		<header className="main-header application__header">
			<IndexLink
				to={{
					path: props.base,
					query: {
						...props.query
					}
				}}
				title="Navigate to documentation [ctrl+d]"
				className="logo"
				>
				<Icon
					base={props.base}
					symbol={props.icon}
					fallback={false}
					>
					{props.title}
				</Icon>
			</IndexLink>
			<div className="toolbar">
				<Link
					className="menu"
					to={{
						path: props.path,
						query: {
							...props.query,
							'menu-enabled': !props.menuEnabled
						}
					}}
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
	path: t.string.isRequired,
	query: t.object.isRequired,
	title: t.string.isRequired
};
