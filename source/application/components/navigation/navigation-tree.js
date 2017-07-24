import React, {Component, PropTypes as types} from 'react';
import pure from 'pure-render-decorator';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import NavigationItem from './navigation-item';
import getAugmentedChildren from '../../utils/augment-hierarchy';

@pure
class NavigationTree extends Component {
	displayName = 'NavigationTree';

	static propTypes = {
		activePattern: types.string,
		base: types.string.isRequired,
		children: types.oneOfType([
			types.node,
			types.arrayOf(types.node)
		]),
		config: types.object,
		data: types.object,
		hide: types.bool.isRequired,
		hierarchy: types.object,
		id: types.string,
		pathname: types.string,
		prefix: types.string,
		query: types.object.isRequired,
		searchQuery: types.string
	};

	render() {
		const {props} = this;
		const {folders, items} = getAugmentedChildren(props.data, props.hierarchy);
		const frags = (props.pathname || '').split('/').filter(Boolean).slice(1);
		const className = ['navigation-tree', props.className, props.active && 'navigation-tree--active'].filter(Boolean).join(' ');

		return (
			<CSSTransitionGroup
				component="ul"
				className={className}
				transitionName="pattern-content-transition"
				transitionEnterTimeout={300}
				transitionLeaveTimeout={300}
				>
				{props.children}
				{
					folders.map(folder => {
						const p = folder.path || [];

						const active = folder.expanded ||
							p.length > 0 && p.every((f, i) => frags[i] === f) ||
							props.activePattern.indexOf(folder.id) === 0;

						return (
							<NavigationItem
								active={active || folder.expanded}
								base={props.base}
								hidden={props.hide ? folder.hidden : false}
								id={folder.id}
								key={folder.id}
								linkTo={props.prefix}
								name={folder.displayName}
								pathname={props.pathname}
								query={props.query}
								searchQuery={props.searchQuery}
								symbol={folder.icon || 'folder'}
								symbolActive={folder.iconActive || 'folder-open'}
								type="folder"
								hide={props.hide}
								>
								<NavigationTree
									activePattern={props.activePattern}
									base={props.base}
									data={folder.children}
									hide={props.hide}
									hierarchy={props.hierarchy}
									id={folder.id}
									prefix={props.prefix}
									query={props.query}
									searchQuery={props.searchQuery}
									pathname={props.pathname}
									/>
							</NavigationItem>
						);
					})
				}
				{
					items.map(item => {
						const p = item.path || [];

						const active = props.activePattern === item.id ||
							item.expanded ||
							p.length > 0 && p.every((f, i) => frags[i] === f);

						return (
							<NavigationItem
								active={active}
								base={props.base}
								hidden={props.hide ? item.hidden : false}
								hide={props.hide}
								id={item.id}
								key={item.id}
								linkTo={props.prefix}
								name={item.displayName}
								query={props.query}
								ref={this.getActiveReference}
								searchQuery={props.searchQuery}
								symbol={item.icon || item.type}
								symbolActive={item.iconActive || item.type}
								type={item.type}
								/>
							);
					})
				}
			</CSSTransitionGroup>
		);
	}
}

export default NavigationTree;
