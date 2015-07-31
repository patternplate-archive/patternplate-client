import React from 'react';
import {Component} from 'react';
import deepEqual from 'deep-equal';

import NavigationItem from './navigation-item';

class NavigationTree extends React.Component {
	displayName = 'NavigationTree';

	render () {
		let { data } = this.props;

		let folders = [];
		let patterns = [];

		let children = Object.keys(data).forEach(childKey => {
			let child = this.props.data[childKey];

			if ( child.type == 'pattern' ) {
				patterns.push(child);
			} else if (child.type == 'folder') {
				folders.push(child);
			} else {
				console.warn('Unknown meta hierarchy type "' + child.type + '", skipping.');
			}
		});

		// extract displayName and order from hierarchy config for each folder
		folders = folders.map(folder => {
			let splits = folder.id.split('/');
			let key = splits[splits.length - 1];

			let defaultHierarchyEntry = {
				'order': -1, // default order is -1, hence 'unordered' items are on top
				'displayName': key,
				'icon': 'folder' // TODO: add 'folder' default icon
			};

			let hierarchyEntry = this.props.config.hierarchy[folder.id];

			return {
				...folder,
				...defaultHierarchyEntry,
				...hierarchyEntry
			};
		});

		folders.sort(function (a, b) {
			return (a.order == b.order) ?
				a.displayName > b.displayName :
				a.order > b.order;
		});

		folders = folders.map(folder => {
			let currentPath = this.props.path.split('/');
			let folderPath = folder.id.split('/');
			let active = deepEqual(currentPath.slice(2, 2 + folderPath.length), folderPath);

			return (
				<NavigationItem name={folder.displayName} symbol={folder.icon} id={folder.id} key={folder.id} active={active}>
					<NavigationTree path={this.props.path} config={this.props.config} data={folder.children} id={folder.id} />
				</NavigationItem>
			);
		});

		// extract displayName / name from pattern
		patterns = patterns.map(pattern => {
			return {
				...pattern,
				displayName: pattern.manifest.displayName || pattern.manifest.name
			};
		});

		patterns.sort(function (a, b) {
			return b.displayName > a.displayName;
		});

		patterns = patterns.map(pattern => {
			return (
				<NavigationItem name={pattern.displayName} id={pattern.id} key={pattern.id} symbol={pattern.type} />
			);
		});

		// inject external children (e.g. "Home" item)

		let external = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
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
