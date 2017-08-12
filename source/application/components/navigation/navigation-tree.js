import React, {PropTypes as types} from 'react';
import NavigationItem from './navigation-item';

export default NavigationTree;

function NavigationTree(props) {
	return (
		<div className={props.className}>
			{props.children}
			{(props.data || []).map(item => {
				const hidden = (item.manifest.options || {}).hidden || false;
				const icon = item.manifest.options.icon || item.type;
				const iconActive = item.manifest.options.iconActive || icon;

				return (
					<NavigationItem
						active={item.active}
						hidden={hidden}
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

NavigationTree.propTypes = {
	active: types.string.isRequired,
	className: types.string,
	children: types.any,
	data: types.array.isRequired,
	id: types.string.isRequired,
	prefix: types.string.isRequired
};
