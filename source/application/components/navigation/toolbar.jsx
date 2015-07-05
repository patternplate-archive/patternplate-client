import React from 'react';
import classnames from 'classnames';
import {Link} from 'react-router';

import cookie from 'cookie';

import Icon from '../common/icon';
import DownloadList from './download-list';

class Toolbar extends React.Component {
	displayName = 'Toolbar';

	componentWillMount() {
		this.setState({
			'theme': this.props.config.theme,
			'themeTarget': this.props.config.themeTarget
		})
	}

	componentDidMount() {
		this.link = document.querySelector('[data-application-theme]');
	}

	toggleTheme() {
		let state = {
			'theme': this.state.themeTarget,
			'themeTarget': this.state.theme
		};

		this.setState(state);

		if (document) {
			let data = {};

			try {
				let cookieData = JSON.parse(cookie.parse(document.cookie)['patternplate-client'] || {});
				data = cookieData;
			} catch (err) {
				console.warn('Failed to read data from "patternplate-client" cookie');
			}

			document.cookie = cookie.serialize('patternplate-client', JSON.stringify(Object.assign({}, data, state)));
		}

		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = this.link.href.replace(this.state.theme, this.state.themeTarget);

		link.onload = (e) => {
			document.head.removeChild(this.link);
			this.link = link;
		}

		document.head.appendChild(link);
	}

	onThemeButtonClick = () => {
		this.toggleTheme();
	}

	render () {
		let buildRoute = this.props.schema.routes && this.props.schema.routes.filter((route) => route.name === 'build')[0];
		let themeClassName = classnames('button', this.state.themeTarget);

		return (
			<header className="header">
				<Link className="logo" to="root">
					<Icon symbol="patternplate" fallback={false} inline={true}>{ this.props.schema.name }</Icon>
				</Link>
				<div className="toolbar">
					<label className="button menu" htmlFor="menu-state">
						<Icon uri="" symbol="patternplate">Menu</Icon>
					</label>
					<DownloadList route={buildRoute} items={this.props.schema.builds} />
					<button className={themeClassName} type="button" onClick={(e) => this.onThemeButtonClick(e)}>
						<Icon symbol={this.state.themeTarget}>{this.state.themeTarget}</Icon>
					</button>
				</div>
			</header>
		);
	}
}

export default Toolbar;
