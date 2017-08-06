import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components';

import Icon from '../common/icon';
import Indicator from '../../containers/indicator';
import SearchButton from '../../containers/search-button';

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
						<SearchButton/>
					</li>
					<li className="navigation-toolbar__link">
						<Button
							icon="issue"
							title={`Report an issue ${props.shortcuts.toggleIssue.toString()}`}
							to={issue}
							/>
					</li>
					<li className="navigation-toolbar__link">
						<Button
							icon="command"
							title={`Show keyboard shortcuts ${props.shortcuts.toggleShortcuts.toString()}`}
							to={cheatsheet}
							/>
					</li>
					<li className="navigation-toolbar__link">
						<Button
							icon={targetTheme}
							title={`Switch to ${targetTheme} theme ${props.shortcuts.toggleTheme.toString()}`}
							to={themeChange}
							/>
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

const StyledButton = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 34px;
	height: 34px;
`;

function Button(props) {
	return (
		<StyledButton {...props}>
			<Icon symbol={props.icon}/>
		</StyledButton>
	);
}
