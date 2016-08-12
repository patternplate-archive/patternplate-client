import url from 'url';
import path from 'path';
import React, {Component, PropTypes as t} from 'react';
import classnames from 'classnames';
import {IndexLink} from 'react-router';

import pure from 'pure-render-decorator';
import autobind from 'autobind-decorator';

import Icon from '../common/icon';

function getTheme(location) {
	const passed = location.query.theme;
	return passed === 'dark' ? 'dark' : 'light';
}

function getOtherTheme(location) {
	const theme = getTheme(location);
	return theme === 'dark' ? 'light' : 'dark';
}

function getThemeUrl(old, theme) {
	const href = url.parse(old);
	const fragments = href.pathname.split('/');
	const basePathname = fragments.slice(0, fragments.length - 1);
	const fileName = `${theme}${path.extname(href.pathname)}`;
	return [...basePathname, fileName].join('/');
}

@pure
@autobind
class Toolbar extends Component {
	static propTypes = {
		icon: t.string.isRequired,
		title: t.string.isRequired,
		theme: t.string.isRequired,
		location: t.object.isRequired
	};

	static defaultProps = {
		theme: 'light',
		icon: 'patternplate'
	};

	static contextTypes = {
		router: t.any
	};

	handleThemeButtonClick() {
		const passedQuery = this.props.location.query;
		const pathname = this.props.location.pathname;
		const theme = this.props.theme === 'dark' ? 'light' : 'dark';
		const query = {...passedQuery, theme};
		this.context.router.push({pathname, query});
	}

	setTheme(theme) {
		if (this.link) {
			const href = this.link.href;
			const themeUrl = getThemeUrl(href, theme);
			if (href !== themeUrl) {
				this.link.href = themeUrl;
			}
		}
	}

	componentDidMount() {
		this.link = global.document.head.querySelector('link[data-application-theme]');
		this.setTheme(this.props.theme);
	}

	componentDidUpdate(previous) {
		const {props} = this;
		if (previous.theme !== props.theme) {
			this.setTheme(this.props.theme);
		}
	}

	render() {
		const {icon, title, location} = this.props;
		const theme = getOtherTheme(location);
		const themeClassName = classnames('button', theme);

		return (
			<header className="main-header">
				<IndexLink className="logo" to="/" title="Navigate to start page">
					<Icon
						symbol={icon}
						fallback={false}
						inline
						>
						{title}
					</Icon>
				</IndexLink>
				<div className="toolbar">
					<label className="button menu" htmlFor="menu-state">
						<Icon symbol="patternplate">
							Menu
						</Icon>
					</label>
					<button
						className={themeClassName}
						type="button"
						onClick={this.handleThemeButtonClick}
						title={`Switch to ${theme} theme`}
						>
						<Icon symbol={theme}>
							{theme}
						</Icon>
					</button>
				</div>
			</header>
		);
	}
}

export default Toolbar;
