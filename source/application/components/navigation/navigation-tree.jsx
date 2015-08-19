import React from 'react';
import {Component} from 'react';
import deepEqual from 'deep-equal';

import NavigationItem from './navigation-item';
import getAugmentedChildren from '../../utils/augment-hierarchy';

class NavigationTree extends React.Component {
	displayName = 'NavigationTree';

	render () {
		let { data, path, children, config } = this.props;

		let { folders, patterns } = getAugmentedChildren(data, config.hierarchy);

		folders = folders.map(folder => {
			let currentPath = path.split('/');
			let folderPath = folder.id.split('/');
			let active = deepEqual(currentPath.slice(2, 2 + folderPath.length), folderPath);

			return (
				<NavigationItem name={folder.displayName} symbol={folder.icon} id={folder.id} key={folder.id} active={active}>
					<NavigationTree path={path} config={config} data={folder.children} id={folder.id} />
				</NavigationItem>
			);
		});

		patterns = patterns.map(pattern => {
			return (
				<NavigationItem name={pattern.displayName} id={pattern.id} key={pattern.id} symbol={pattern.type} />
			);
		});

		let external = Array.isArray(children) ? children : [children];
		external = external.filter((item) => item);
		external = external.map((child) => {
			return React.cloneElement(child);
		});

		return (
			<ul className="navigation-tree">
				{external}
				{folders}
				{patterns}
			</ul>
		);
	}
}

export default NavigationTree;
