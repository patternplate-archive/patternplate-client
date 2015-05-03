import React from 'react';
import classnames from 'classnames';
import {Link} from 'react-router';

import Icon from '../common/icon.jsx';

class Toolbar extends React.Component {
	displayName = 'Toolbar';

	state = {
		'theme': 'light',
		'target': 'dark'
	};

	componentDidMount() {
		this.link = document.querySelector('[application-theme]');
	}

	toggleTheme() {
		this.setState({
			'theme': this.state.target,
			'target': this.state.theme
		});

		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = this.link.href.replace(this.state.theme, this.state.target);

		link.onload = (e) => {
			document.head.removeChild(this.link);
			this.link = link;
		}

		document.head.appendChild(link);
	}

	onThemeButtonClick() {
		this.toggleTheme();
	}

	render () {
		let themeClassName = classnames('button', this.state.target);

		return (
			<header className="header">
				<Link className="logo" to="root">
					<Icon symbol="patternplate" fallback={false}>{ this.props.schema.name }</Icon>
				</Link>
				<div className="toolbar">
					<label className="button menu" htmlFor="menu-state">
						<Icon symbol="patternplate">Menu</Icon>
					</label>
					<button className={themeClassName} type="button" onClick={(e) => this.onThemeButtonClick(e)}>
						<Icon symbol={this.state.target}>{this.state.target}</Icon>
					</button>
				</div>
			</header>
		);
	}
}

export default Toolbar;
