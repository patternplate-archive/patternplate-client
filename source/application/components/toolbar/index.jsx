import React, {PropTypes as t} from 'react';
import {Link, IndexLink} from 'react-router';

import Icon from '../common/icon';

export default Toolbar;

function Toolbar(props) {

	return (
		<header className="main-header">
			<div className="logo">
				<IndexLink
					to={{
						pathname: props.base,
						query: {
							...props.query
						}
					}}
					title="Navigate to documentation [ctrl+d]"
					>
					<Icon
						base={props.base}
						symbol={props.icon}
						fallback={false}
						>
						{props.title}
					</Icon>
				</IndexLink>
				<span className="version">
					v{props.version}
				</span>
			</div>
			<div className="toolbar">
				<Link
					className="menu"
					to={{
						pathname: props.pathname,
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

Toolbar.propTypes = {
	base: t.string.isRequired,
	icon: t.string.isRequired,
	menuEnabled: t.bool.isRequired,
	pathname: t.string.isRequired,
	query: t.object.isRequired,
	title: t.string.isRequired,
	version: t.string.isRequired
};
