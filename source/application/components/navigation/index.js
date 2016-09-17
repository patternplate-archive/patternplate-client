import React, {PropTypes as t} from 'react';
import autobind from 'autobind-decorator';
import classnames from 'classnames';
import pure from 'pure-render-decorator';

import NavigationTree from './navigation-tree';
import NavigationItem from './navigation-item';
import NavigationToolbar from './navigation-toolbar';
import SearchField from '../common/search-field';
import Header from '../header';

@pure
class Navigation extends React.Component {
	static propTypes = {
		activePattern: t.string.isRequired,
		base: t.string.isRequired,
		enabled: t.bool.isRequired,
		expanded: t.bool.isRequired,
		hierarchy: t.object,
		icon: t.string.isRequired,
		menuEnabled: t.bool.isRequired,
		navigation: t.object.isRequired,
		onSearch: t.func,
		onSearchBlur: t.func,
		onThemeChange: t.func.isRequired,
		pathname: t.string.isRequired,
		query: t.object.isRequired,
		requestSearchBlur: t.func.isRequired,
		searchQuery: t.string,
		searchValue: t.string,
		theme: t.string.isRequired,
		title: t.string.isRequired,
		version: t.string.isRequired
	};

	static defaultProps = {
		onSearch: () => {},
		onSearchBlur: () => {},
		requestSearchBlur: () => {}
	}

	@autobind
	handleSearchSubmit(e) {
		e.preventDefault();
	}

	@autobind
	handleSearchChange(e) {
		this.props.onSearch(e.target.value);
	}

	render() {
		const {props} = this;

		const className = classnames('navigation application__navigation', {
			'slim': !props.expanded,
			'navigation--expanded': props.expanded
		});

		return (
			<nav className={className}>
				<Header
					base={props.base}
					icon={props.icon}
					menuEnabled={props.menuEnabled}
					pathname={props.pathname}
					query={props.query}
					title={props.title}
					version={props.version}
					/>
				<NavigationTree
					activePattern={props.activePattern}
					base={props.base}
					data={props.navigation}
					query={props.query}
					hierarchy={props.hierarchy}
					>
					<form onSubmit={this.handleSearchSubmit} method="GET">
						<SearchField
							base={props.base}
							blur={this.props.requestSearchBlur}
							className="navigation__search-field"
							linkTo="/search"
							name="search"
							onBlur={this.handleSearchBlur}
							onChange={this.handleSearchChange}
							onFocus={this.handleSearchFocus}
							placeholder="Search"
							title="Search for patterns [ctrl+space]"
							value={props.searchValue}
							/>
					</form>
					<NavigationItem
						active={props.pathname === props.base}
						base={props.base}
						key="root"
						linkTo="/"
						name="Documentation"
						query={props.query}
						symbol="documentation"
						title="Navigate to documentation [ctrl+d]"
						type="page"
						/>
				</NavigationTree>
				<NavigationToolbar
					base={props.base}
					expanded={props.expanded}
					onThemeChange={props.onThemeChange}
					pathname={props.pathname}
					query={props.query}
					theme={props.theme}
					/>
			</nav>
		);
	}
}

export default Navigation;
