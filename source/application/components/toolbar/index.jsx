import React, {PropTypes as t} from 'react';
import {Link, IndexLink} from 'react-router';

import Icon from '../common/icon';

export default Toolbar;

function Toolbar(props) {
	const targetTheme = props.theme === 'dark' ? 'light' : 'dark';
	const handleThemeChange = () => props.onThemeChange(targetTheme);

	const styles = {
		light: {display: targetTheme === 'light' ? 'block' : 'none'},
		dark: {display: targetTheme === 'dark' ? 'block' : 'none'}
	};

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
					title="Navigate to start page"
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
				<div className="toolbar-tools">
					<button
						className="button"
						type="button"
						onClick={handleThemeChange}
						title={`Switch to ${targetTheme} theme`}
						>
						<Icon
							base={props.base}
							symbol="light"
							style={styles.light}
							>
							Light
						</Icon>
						<Icon
							base={props.base}
							symbol="dark"
							style={styles.dark}
							>
							Dark
						</Icon>
					</button>
				</div>
			</div>
		</header>
	);
}

Toolbar.propTypes = {
	base: t.string.isRequired,
	icon: t.string.isRequired,
	onThemeChange: t.func.isRequired,
	menuEnabled: t.bool.isRequired,
	pathname: t.string.isRequired,
	query: t.object.isRequired,
	theme: t.string.isRequired,
	title: t.string.isRequired,
	version: t.string.isRequired
};
