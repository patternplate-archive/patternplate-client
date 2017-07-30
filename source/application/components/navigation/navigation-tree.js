import path from 'path';
import React, {Component, PropTypes as types} from 'react';
import pure from 'pure-render-decorator';

import NavigationItem from './navigation-item';

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
		data: types.array.isRequired,
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
		const className = ['navigation-tree', props.className, props.active && 'navigation-tree--active'].filter(Boolean).join(' ');

		return (
			<ul className={className}>
				{props.children}
				{(props.data || []).map(item => {
					const p = (props.pathname || '').split('/').filter(Boolean).slice(1).join('/');
					const active = matches(item, p);
					const hidden = props.hide ? item.manifest.options.hidden : false;
					const icon = item.manifest.options.icon || item.type;
					const iconActive = item.manifest.options.iconActive || icon;

					return (
						<NavigationItem
							active={active}
							base={props.base}
							hidden={hidden}
							hide={props.hide}
							id={item.id}
							key={item.id}
							linkTo={props.prefix}
							name={item.manifest.displayName}
							pathname={props.pathname}
							query={props.query}
							searchQuery={props.searchQuery}
							symbol={icon}
							symbolActive={iconActive}
							to={item.to}
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
			</ul>
		);
	}
}

export default NavigationTree;

function matches(tree, id) {
	const frags = id.split('/').filter(Boolean);
	const p = tree.path || [];

	if (p.length > 0 && p.every((p, i) => frags[i] && strip(frags[i]) === strip(p))) {
		return true;
	}

	return (tree.children || []).some(child => matches(child, id));
}

function strip(b) {
	return path.basename(b, path.extname(b));
}
