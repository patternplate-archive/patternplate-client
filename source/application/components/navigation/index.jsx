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
		config: types.object.isRequired,
		onSearch: types.func,
		onSearchBlur: types.func,
		searchValue: types.string,
		searchQuery: types.string
	};

	static defaultProps = {
		searchValue: 'Search',
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
			config,
			navigation,
			searchQuery
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
					config={config}
					searchQuery={searchQuery}
					>
					<form onSubmit={this.handleSearchSubmit} method="GET">
						<SearchField
							linkTo="/search"
							className="navigation__search-field"
							value={searchQuery}
							name="search"
							placeholder={searchPlaceholder}
							onFocus={this.handleSearchFocus}
							onBlur={this.handleSearchBlur}
							onChange={this.handleSearchChange}
							/>
					</form>
					{
						!searchQuery &&
							<NavigationItem
								name="Documentation"
								symbol="documentation"
								id={0}
								key="root"
								linkTo="/"
								/>
					}
				</NavigationTree>
				<button className="toggleMode" onClick={this.handleToggleClick}>
					<Icon symbol={expandIcon}/>
				</button>
			</nav>
		);
	}
}

export default Navigation;
