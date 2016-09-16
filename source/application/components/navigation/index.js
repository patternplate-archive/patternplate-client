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
		about: t.arrayOf(t.shape({
			label: t.string,
			value: t.string
		})).isRequired,
		activePattern: t.string.isRequired,
		base: t.string.isRequired,
		enabled: t.bool.isRequired,
		expanded: t.bool.isRequired,
		hierarchy: t.object,
		icon: t.string.isRequired,
		location: t.object.isRequired,
		menuEnabled: t.bool.isRequired,
		navigation: t.object.isRequired,
		onSearch: t.func,
		onSearchBlur: t.func,
		onThemeChange: t.func.isRequired,
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
		const {
			about,
			activePattern,
			base,
			expanded,
			hierarchy,
			icon,
			location,
			menuEnabled,
			navigation,
			onThemeChange: handleThemeChange,
			searchValue,
			title,
			version
		} = this.props;

		const className = classnames('navigation application__navigation', {
			'slim': !expanded,
			'navigation--expanded': expanded
		});

		return (
			<nav className={className}>
				<Header
					about={about}
					base={base}
					icon={icon}
					location={location}
					menuEnabled={menuEnabled}
					path={location.pathname}
					query={location.query}
					title={title}
					version={version}
					/>
				<NavigationTree
					activePattern={activePattern}
					base={base}
					data={navigation}
					path={location.pathname}
					hierarchy={hierarchy}
					location={location}
					>
					<form onSubmit={this.handleSearchSubmit} method="GET">
						<SearchField
							base={base}
							blur={this.props.requestSearchBlur}
							className="navigation__search-field"
							linkTo="/search"
							name="search"
							onBlur={this.handleSearchBlur}
							onChange={this.handleSearchChange}
							onFocus={this.handleSearchFocus}
							placeholder="Search"
							title="Search for patterns [ctrl+space]"
							value={searchValue}
							/>
					</form>
					<NavigationItem
						name="Documentation"
						symbol="documentation"
						key="root"
						location={location}
						linkTo="/"
						active={location.pathname === base}
						type="page"
						title="Navigate to documentation [ctrl+d]"
						base={base}
						/>
				</NavigationTree>
				<NavigationToolbar
					base={base}
					expanded={expanded}
					location={location}
					onThemeChange={handleThemeChange}
					theme={this.props.theme}
					/>
			</nav>
		);
	}
}

export default Navigation;
