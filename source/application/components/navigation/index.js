import React, {PropTypes as t} from 'react';
import classnames from 'classnames';

import NavigationTree from './navigation-tree';
import NavigationItem from './navigation-item';
import NavigationToolbar from './navigation-toolbar';
import Header from '../header';

class Navigation extends React.Component {
	static propTypes = {
		activePattern: t.string.isRequired,
		base: t.string.isRequired,
		docs: t.object.isRequired,
		enabled: t.bool.isRequired,
		hierarchy: t.object,
		hide: t.bool.isRequired,
		icon: t.string.isRequired,
		menuEnabled: t.bool.isRequired,
		navigation: t.object.isRequired,
		onSearch: t.func,
		onSearchBlur: t.func,
		pathname: t.string.isRequired,
		query: t.object.isRequired,
		requestSearchBlur: t.func.isRequired,
		searchQuery: t.string,
		searchValue: t.string,
		shortcuts: t.any.isRequired,
		theme: t.string.isRequired,
		title: t.string.isRequired,
		version: t.string.isRequired
	};

	static defaultProps = {
		onSearch: () => {},
		onSearchBlur: () => {},
		requestSearchBlur: () => {}
	}

	render() {
		const {props} = this;

		const className = classnames('navigation application__navigation navigation--expanded');

		return (
			<nav className={className}>
				<NavigationTree
					activePattern={props.activePattern}
					base={props.base}
					data={props.navigation.children}
					hide={props.hide}
					hierarchy={props.hierarchy}
					pathname={props.pathname}
					prefix="/pattern"
					query={props.query}
					>
					<Header
						base={props.base}
						icon={props.icon}
						menuEnabled={props.menuEnabled}
						pathname={props.pathname}
						query={props.query}
						shortcuts={props.shortcuts}
						title={props.title}
						version={props.version}
						/>
					<Documentation
						activePattern={props.activePattern}
						base={props.base}
						docs={props.docs}
						hide={props.hide}
						hierarchy={props.hierarchy}
						pathname={props.pathname}
						query={props.query}
						searchQuery={props.searchQuery}
						/>
				</NavigationTree>
				<NavigationToolbar
					base={props.base}
					expanded={props.expanded}
					pathname={props.pathname}
					query={props.query}
					shortcuts={props.shortcuts}
					theme={props.theme}
					/>
			</nav>
		);
	}
}

export default Navigation;

function Documentation(props) {
	return (
		<NavigationTree
			active={props.pathname === '/' || props.pathname.indexOf('/doc') === 0}
			activePattern={props.activePattern}
			base={props.base}
			className="docs-navigation"
			data={props.docs.children}
			hide={props.hide}
			pathname={props.pathname}
			prefix="/doc"
			query={props.query}
			>
			<NavigationItem
				active={props.pathname === '/' || props.pathname === '/doc'}
				base={props.base}
				hidden={false}
				hide={props.hide}
				id="/"
				key="/"
				linkTo=""
				name={props.docs.manifest.displayName}
				query={props.query}
				searchQuery={props.searchQuery}
				type="doc"
				symbol="doc"
				symbolActive="doc"
				/>
		</NavigationTree>
	);
}

Documentation.propTypes = {
	activePattern: t.string.isRequired,
	base: t.string.isRequired,
	docs: t.object.isRequired,
	hide: t.bool.isRequired,
	pathname: t.string.isRequired,
	query: t.any,
	searchQuery: t.string
};
