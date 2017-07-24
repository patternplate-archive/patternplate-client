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
		const items = getAugmentedChildren(props.data, props.hierarchy);
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
				{items.map(item => {
					const p = item.path || [];

					const active = item.expanded ||
						p.length > 0 && p.every((f, i) => frags[i] === f) ||
						props.activePattern.indexOf(item.id) === 0;

					const hidden = props.hide ? item.hidden : false;

					return (
						<NavigationItem
							active={active}
							base={props.base}
							hidden={hidden}
							hide={props.hide}
							id={item.id}
							key={item.id}
							linkTo={props.prefix}
							name={item.displayName}
							pathname={props.pathname}
							query={props.query}
							searchQuery={props.searchQuery}
							symbol={item.icon}
							symbolActive={item.iconActive}
							type={item.type}
							>
							{
								item.type === 'folder' &&
									<NavigationTree
										activePattern={props.activePattern}
										base={props.base}
										data={item.children}
										hide={props.hide}
										hierarchy={props.hierarchy}
										id={item.id}
										prefix={props.prefix}
										query={props.query}
										searchQuery={props.searchQuery}
										pathname={props.pathname}
										/>
							}
						</NavigationItem>
					);
				})}
			</CSSTransitionGroup>
		);
	}
}

export default NavigationTree;
