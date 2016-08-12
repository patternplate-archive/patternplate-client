import React, {PropTypes as types} from 'react';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';
import classnames from 'classnames';
import pure from 'pure-render-decorator';

import NavigationTree from './navigation-tree';
import NavigationItem from './navigation-item';
import Icon from '../common/icon';
import SearchField from '../common/search-field';

@pure
class Navigation extends React.Component {
	displayName = 'Navigation';

	static propTypes = {
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
		const expandIcon = expanded ? 'arrow-double-left' : 'arrow-double-right';

		return (
			<nav className={className}>
				<NavigationTree
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
							/>
					</form>
					<NavigationItem
						name="Documentation"
						symbol="documentation"
						key="root"
						location={location}
						linkTo="/"
						active={path === '/'}
						type="page"
						/>
				</NavigationTree>
				<Link
					to={{
						pathname: location.pathname,
						query: {...location.query, ...{expanded: !expanded}}
					}}
					className="toggleMode"
					onClick={this.handleToggleClick}
					title={expanded ? 'Collapse navigation' : 'Expand navigation'}
					>
					<Icon symbol={expandIcon}/>
				</Link>
			</nav>
		);
	}
}

export default Navigation;
