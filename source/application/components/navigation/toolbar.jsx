import React from 'react';
import classnames from 'classnames';
import cookie from 'cookie';
import {Link} from 'react-router';
import pure from 'pure-render-decorator';

import Icon from '../common/icon';

const document = global.document;

@pure
class Toolbar extends React.Component {
	displayName = 'Toolbar';

	componentWillMount() {
		this.setState({
			theme: this.props.config.theme,
			themeTarget: this.props.config.themeTarget
		});
	}

	componentDidMount() {
		this.link = document.querySelector('[data-application-theme]');
	}

	toggleTheme() {
		const state = {
			theme: this.state.themeTarget,
			themeTarget: this.state.theme
		};

		this.setState(state);

		if (document) {
			try {
				const cookieData = JSON.parse(cookie.parse(document.cookie)['patternplate-client'] || {});
				document.cookie = cookie.serialize('patternplate-client', JSON.stringify(Object.assign({}, cookieData, state)));
			} catch (err) {
				console.warn('Failed to read data from "patternplate-client" cookie');
			}
		}

		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = this.link.href.replace(this.state.theme, this.state.themeTarget);

		link.onload = () => {
			document.head.removeChild(this.link);
			this.link = link;
		};

		document.head.appendChild(link);
	}

	onThemeButtonClick = () => {
		this.toggleTheme();
	}

	render() {
		const themeClassName = classnames('button', this.state.themeTarget);
		const title = this.props.config.title || this.props.schema.name;
		const icon = this.props.config.icon || 'patternplate';

		return (
			<header className="main-header">
				<Link className="logo" to="root">
					<Icon
						symbol={icon}
						fallback={false}
						inline={true}>
						{title}
					</Icon>
				</Link>
				<div className="toolbar">
					<label className="button menu" htmlFor="menu-state">
						<Icon uri="" symbol="patternplate">Menu</Icon>
					</label>
					<button
						className={themeClassName}
						type="button"
						onClick={e => this.onThemeButtonClick(e)}>
						<Icon symbol={this.state.themeTarget}>{this.state.themeTarget}</Icon>
					</button>
				</div>
			</header>
		);
	}
}

export default Toolbar;
