import React, {PropTypes as t} from 'react';
import {IndexLink} from 'react-router';

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
			<IndexLink
				className="logo"
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
			<div className="toolbar">
				<label className="button menu" htmlFor="menu-state">
					<Icon base={props.base} symbol="patternplate">
						Menu
					</Icon>
				</label>
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

/* function getTheme(location) {
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
		base: t.string.isRequired,
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
		const {base, icon, title, location} = this.props;
		const theme = getOtherTheme(location);
		const themeClassName = classnames('button', theme);

		const styles = {
			light: {display: theme === 'light' ? 'block' : 'none'},
			dark: {display: theme === 'dark' ? 'block' : 'none'}
		};

		return (
			<header className="main-header">
				<IndexLink className="logo" to={base} title="Navigate to start page">
					<Icon
						base={base}
						symbol={icon}
						fallback={false}
						inline
						>
						{title}
					</Icon>
				</IndexLink>
				<div className="toolbar">
					<label className="button menu" htmlFor="menu-state">
						<Icon base={base} symbol="patternplate">
							Menu
						</Icon>
					</label>
					<button
						className={themeClassName}
						type="button"
						onClick={this.handleThemeButtonClick}
						title={`Switch to ${theme} theme`}
						>
						<Icon base={base} symbol="light" style={styles.light}>
							Light
						</Icon>
						<Icon base={base} symbol="dark" style={styles.dark}>
							Dark
						</Icon>
					</button>
				</div>
			</header>
		);
	}
}

export default Toolbar; */
