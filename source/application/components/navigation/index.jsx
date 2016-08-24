import React, {PropTypes as types} from 'react';
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
		base: types.string.isRequired,
		navigation: types.object.isRequired,
		path: types.string.isRequired,
		onSearch: types.func,
		onSearchBlur: types.func,
		searchValue: types.string,
		searchQuery: types.string,
		hierarchy: types.object,
		location: types.object
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
			base,
			path,
			navigation,
			hierarchy,
			location,
			searchValue
		} = this.props;

		const expanded = typeof location.query.expanded === 'undefined' ?
			true :
			location.query.expanded !== 'false';

		const className = classnames('navigation', {slim: !expanded});

		return (
			<nav className={className}>
				<NavigationTree
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
						base={base}
						/>
				</NavigationTree>
				<NavigationToolbar
					base={base}
					expanded={expanded}
					location={location}
					/>
			</nav>
		);
	}
}

export default Navigation;
