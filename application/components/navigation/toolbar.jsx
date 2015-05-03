import React from 'react';
import classnames from 'classnames';
import {Link} from 'react-router';

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
				<div className="logo">
					<Link to="root">{ this.props.schema.name }</Link>
				</div>
				<div className="toolbar">
					<button className={themeClassName} type="button" onClick={(e) => this.onThemeButtonClick(e)}>
						Switch to {this.state.target}
					</button>
				</div>
			</header>
		);
	}
}

export default Toolbar;
