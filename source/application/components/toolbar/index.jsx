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
					{props.version}
				</span>
			</div>
			<div className="toolbar">
				<label className="button menu" htmlFor="menu-state">
					<Icon base={props.base} symbol="patternplate">
						Menu
					</Icon>
				</label>
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
	theme: t.string.isRequired,
	title: t.string.isRequired,
	onThemeChange: t.func.isRequired,
	query: t.object.isRequired
};
