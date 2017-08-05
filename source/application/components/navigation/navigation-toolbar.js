import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';

import Icon from '../common/icon';
import Indicator from '../../containers/indicator';

export default function NavigationToolbar(props) {
	const issue = {
		pathname: props.pathname,
		query: {
			...props.query,
			issue: true
		}
	};

	const cheatsheet = {
		pathname: props.pathname,
		query: {
			...props.query,
			lightbox: 'shortcuts'
		}
	};

	const targetTheme = props.theme === 'dark' ? 'light' : 'dark';

	const themeChange = {
		pathname: props.pathname,
		query: {
			...props.query,
			theme: targetTheme
		}
	};

	const styles = {
		light: {display: targetTheme === 'light' ? 'block' : 'none'},
		dark: {display: targetTheme === 'dark' ? 'block' : 'none'}
	};

	return (
		<div className="navigation-toolbar">
			<div className="navigation-toolbar__container">
				<ul className="navigation-toolbar__links">
					<li className="navigation-toolbar__link">
						<Link
							className="button"
							title={`Report an issue ${props.shortcuts.toggleIssue.toString()}`}
							to={issue}
							>
							<Icon symbol="issue"/>
						</Link>
					</li>
					<li className="navigation-toolbar__link">
						<Link
							className="button"
							title={`Show keyboard shortcuts ${props.shortcuts.toggleShortcuts.toString()}`}
							to={cheatsheet}
							>
							<Icon symbol="command"/>
						</Link>
					</li>
					<li className="navigation-toolbar__link">
						<Link
							className="button"
							title={`Switch to ${targetTheme} theme ${props.shortcuts.toggleTheme.toString()}`}
							to={themeChange}
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
						</Link>
					</li>
				</ul>
				<Indicator/>
			</div>
		</div>
	);
}

NavigationToolbar.propTypes = {
	base: t.string.isRequired,
	children: t.any,
	expanded: t.bool.isRequired,
	pathname: t.string.isRequired,
	query: t.object.isRequired,
	shortcuts: t.any,
	theme: t.string.isRequired
};
