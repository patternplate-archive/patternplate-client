import {startsWith} from 'lodash';
import React, {Component, PropTypes as types} from 'react';
import pure from 'pure-render-decorator';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import NavigationItem from './navigation-item';
import getAugmentedChildren from '../../utils/augment-hierarchy';

const LINKS = {
	doc: '/docs',
	pattern: '/pattern'
};

@pure
class NavigationTree extends Component {
	displayName = 'NavigationTree';

	static propTypes = {
		id: types.string,
		activePattern: types.string,
		base: types.string.isRequired,
		data: types.object,
		hide: types.bool.isRequired,
		query: types.object.isRequired,
		searchQuery: types.string,
		children: types.oneOfType([
			types.node,
			types.arrayOf(types.node)
		]),
		config: types.object,
		hierarchy: types.object
	};

	render() {
		const {props} = this;
		const {folders, items} = getAugmentedChildren(props.data, props.hierarchy);

		return (
			<CSSTransitionGroup
				component="ul"
				className="navigation-tree"
				transitionName="pattern-content-transition"
				transitionEnterTimeout={300}
				transitionLeaveTimeout={300}
				>
				{props.children}
				{
					folders.map(folder => {
						const active = startsWith(props.activePattern, folder.id);

						return (
							<NavigationItem
								active={active || folder.expanded}
								base={props.base}
								id={folder.id}
								key={folder.id}
								name={folder.displayName}
								onClick={this.handleFolderClick}
								query={props.query}
								searchQuery={props.searchQuery}
								symbol={folder.icon}
								symbolActive={folder.iconActive}
								type="directory"
								hide={props.hide}
								>
								<NavigationTree
									activePattern={props.activePattern}
									base={props.base}
									data={folder.children}
									hierarchy={props.hierarchy}
									id={folder.id}
									query={props.query}
									searchQuery={props.searchQuery}
									hide={props.hide}
									/>
							</NavigationItem>
						);
					})
				}
				{
					items.map(item => {
						return (
							<NavigationItem
								active={props.activePattern === item.id || item.expanded}
								base={props.base}
								hidden={props.hide ? item.manifest.options.hidden : false}
								id={item.id}
								key={item.id}
								linkTo={LINKS[item.type]}
								name={item.displayName}
								query={props.query}
								ref={this.getActiveReference}
								searchQuery={props.searchQuery}
								symbol={item.type}
								type={item.type}
								hide={props.hide}
								/>
							);
					})
				}
			</CSSTransitionGroup>
		);
	}
}

export default NavigationTree;
