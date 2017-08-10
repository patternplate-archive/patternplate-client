import React, {Component, PropTypes as types} from 'react';
import pure from 'pure-render-decorator';

import NavigationItem from './navigation-item';

@pure
class NavigationTree extends Component {
	displayName = 'NavigationTree';

	static propTypes = {
		active: types.string,
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
		query: types.object.isRequired,
		searchQuery: types.string
	};

	render() {
		const {props} = this;
		return (
			<div className={props.className}>
				{props.children}
				{(props.data || []).map(item => {
					const hidden = props.hide ? item.manifest.options.hidden : false;
					const icon = item.manifest.options.icon || item.type;
					const iconActive = item.manifest.options.iconActive || icon;

					return (
						<NavigationItem
							active={item.active}
							hidden={hidden}
							hide={props.hide}
							href={item.href}
							id={item.id}
							key={item.id}
							name={item.manifest.displayName}
							prefix={props.prefix}
							symbol={icon}
							symbolActive={iconActive}
							type={item.type}
							>
							{
								item.type === 'folder' &&
									<NavigationTree
										active={props.active}
										data={item.children}
										hide={props.hide}
										id={item.id}
										prefix={item.prefix}
										/>
							}
						</NavigationItem>
					);
				})}
			</div>
		);
	}
}

export default NavigationTree;
