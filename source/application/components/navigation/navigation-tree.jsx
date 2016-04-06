import React from 'react';
import {Component, PropTypes as types} from 'react';
import deepEqual from 'deep-equal';

import NavigationItem from './navigation-item';
import getAugmentedChildren from '../../utils/augment-hierarchy';

class NavigationTree extends Component {
	displayName = 'NavigationTree';

	static propTypes = {
		data: types.object,
		path: types.string,
		children: types.oneOfType([
			types.node,
			types.arrayOf(types.node)
		]),
		config: types.object
	};

	render() {
		const {data, path, children, config} = this.props;
		const {folders, patterns} = getAugmentedChildren(data, config.hierarchy);

		const nested = folders.map(folder => {
			const currentPath = path.split('/');
			const folderPath = folder.id.split('/');
			const active = deepEqual(currentPath.slice(2, 2 + folderPath.length), folderPath);

			return (
				<NavigationItem
					name={folder.displayName}
					symbol={folder.icon}
					id={folder.id}
					key={folder.id}
					active={active}
					>
					<NavigationTree
						path={path}
						config={config}
						data={folder.children}
						id={folder.id}
						/>
				</NavigationItem>
			);
		});

		const items = patterns.map(pattern => {
			const {
				displayName,
				id,
				type,
				manifest
			} = pattern;

			const {options = {}} = manifest;
			const {hidden = false} = options;

			return (
				<NavigationItem
					name={displayName}
					hidden={hidden}
					id={id}
					key={id}
					symbol={type}
					/>
			);
		});

		const external = (Array.isArray(children) ? children : [children])
			.filter(item => item)
			.map(child => {
				return React.cloneElement(child);
			});

		return (
			<ul className="navigation-tree">
				{external}
				{nested}
				{items}
			</ul>
		);
	}
}

export default NavigationTree;
