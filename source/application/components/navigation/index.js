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
		docs: t.arrayOf(t.string).isRequired,
		enabled: t.bool.isRequired,
		expanded: t.bool.isRequired,
		hierarchy: t.object,
		hide: t.bool.isRequired,
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
					hide={props.hide}
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
					<Documentation
						active={props.pathname === props.base}
						base={props.base}
						items={props.docs}
						key="root"
						linkTo="/"
						query={props.query}
						searchQuery={props.searchQuery}
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

function Documentation(props) {
	return (
		<li className="docs">
			<NavigationItem
				active={props.active}
				base={props.base}
				component="ul"
				linkTo={props.linkTo}
				name="Documentation"
				query={props.query}
				symbol="documentation"
				title="Navigate to documentation [ctrl+d]"
				type="page"
				/>
			<ul className="docs-items">
				{
					props.items.children
						.filter(i => i.id.toLowerCase() !== 'readme.md')
						.map(item => {
							if (item.type === 'directory' && item.children.length > 0) {
								return (
									<NavigationItem
										active={false}
										base={props.base}
										id={item.id}
										key={item.id}
										linkTo={`/docs/`}
										name={item.id}
										query={props.query}
										searchQuery={props.searchQuery}
										symbol="folder"
										symbolActive="folder-open"
										type="directory"
										hide={false}
										>
										<NavigationTree
											base={props.base}
											data={item.children}
											id={item.id}
											key={item.id}
											query={props.query}
											/>
									</NavigationItem>
								);
							}
							return (
								<NavigationItem
									active={false}
									base={props.base}
									hidden={false}
									id={item.id}
									key={item.id}
									linkTo={`/docs/`}
									name={item.id}
									query={props.query}
									searchQuery={props.searchQuery}
									symbol="documentation"
									type="docs"
									hide={false}
									/>
							);
						})
				}
			</ul>
		</li>
	);
}

Documentation.propTypes = {
	active: t.bool.isRequired,
	base: t.string.isRequired,
	hide: t.bool.isRequired,
	items: t.arrayOf(t.string).isRequired,
	linkTo: t.string.isRequired,
	query: t.object.isRequired,
	searchQuery: t.string.isRequired
};
