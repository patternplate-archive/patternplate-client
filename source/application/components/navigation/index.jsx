import React, {PropTypes as t} from 'react';
import autobind from 'autobind-decorator';
import classnames from 'classnames';
import pure from 'pure-render-decorator';

import NavigationTree from './navigation-tree';
import NavigationItem from './navigation-item';
import NavigationToolbar from './navigation-toolbar';
import SearchField from '../common/search-field';

@pure
class Navigation extends React.Component {
	static propTypes = {
		activePattern: t.string.isRequired,
		base: t.string.isRequired,
		enabled: t.bool.isRequired,
		expanded: t.bool.isRequired,
		hierarchy: t.object,
		location: t.object,
		navigation: t.object.isRequired,
		onSearch: t.func,
		onSearchBlur: t.func,
		onThemeChange: t.func.isRequired,
		path: t.string.isRequired,
		searchQuery: t.string,
		searchValue: t.string,
		theme: t.string.isRequired
	};

	static defaultProps = {
		onSearch: () => {},
		onSearchBlur: () => {}
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
			activePattern,
			base,
			expanded,
			path,
			navigation,
			hierarchy,
			location,
			searchValue,
			onThemeChange: handleThemeChange
		} = this.props;

		const className = classnames('navigation application__navigation', {
			'slim': !expanded,
			'navigation--expanded': expanded
		});

		return (
			<nav className={className}>
				<NavigationTree
					activePattern={activePattern}
					base={base}
					data={navigation}
					path={path}
					hierarchy={hierarchy}
					location={location}
					>
					<form onSubmit={this.handleSearchSubmit} method="GET">
						<SearchField
							linkTo="/search"
							name="search"
							className="navigation__search-field"
							value={searchValue}
							onFocus={this.handleSearchFocus}
							onBlur={this.handleSearchBlur}
							onChange={this.handleSearchChange}
							placeholder="Search"
							title="Click to search for patterns"
							base={base}
							/>
					</form>
					<NavigationItem
						name="Documentation"
						symbol="documentation"
						key="root"
						location={location}
						linkTo="/"
						active={path === base}
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
