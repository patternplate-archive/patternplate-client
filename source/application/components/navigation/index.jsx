import React, {PropTypes as types} from 'react';
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

	state = {
		expanded: true,
		searchPlaceholder: 'Search'
	}

	componentWillMount() {
		if (this.props.searchValue) {
			this.setState({
				searchValue: this.props.searchValue
			});
		}
	}

	@autobind
	handleToggleClick(e) {
		e.preventDefault();
		this.setState({
			...this.state,
			expanded: !this.state.expanded
		});
	}

	@autobind
	handleSearchFocus() {
		this.setState({
			searchPlaceholder: null
		});
	}

	@autobind
	handleSearchBlur() {
		this.setState({
			searchPlaceholder: 'Search'
		});
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

		const {
			expanded,
			searchPlaceholder
		} = this.state;

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
							placeholder={searchPlaceholder}
							onFocus={this.handleSearchFocus}
							onBlur={this.handleSearchBlur}
							onChange={this.handleSearchChange}
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
				<button
					className="toggleMode"
					onClick={this.handleToggleClick}
					title={expanded ? 'Collapse navigation' : 'Expand navigation'}
					>
					<Icon symbol={expandIcon}/>
				</button>
			</nav>
		);
	}
}

export default Navigation;
