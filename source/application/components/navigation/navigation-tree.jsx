import React from 'react';
import {Component} from 'react';
import camelCase from 'camel-case';

import NavigationItem from './navigation-item';

class NavigationTree extends React.Component {
	displayName = 'NavigationTree';

	render () {
		let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
		children = children.filter((item) => item);

		children = children.map((child) => {
			return React.cloneElement(child);
		});

		let activePath = this.props.path.split('/').slice(2);

		for (let keyName of Object.keys(this.props.data)) {
			let sub = this.props.data[keyName];
			let path = keyName.split('/') || [];
			let id = this.props.id ? this.props.id.split('/') : [];

			let treeFragments = [].concat(id).concat(path)
				.map((item) => item.toLowerCase());

			let treeId = treeFragments.filter((item) => item).join('/')

			if ( typeof sub === 'object' ) {
				let depth = treeFragments.length;
				let active = treeFragments[depth - 1] === activePath[depth - 1];

				children.push(
					<NavigationItem name={keyName} id={treeId} key={treeId} active={active}>
						<NavigationTree data={sub} id={treeId} path={this.props.path} />
					</NavigationItem>
				);
			} else {
				children.push(<NavigationItem name={sub} id={treeId} key={treeId} />)
			}
		}

		if (this.props.config) {
			children.sort((a, b) => {
				return this.props.config.menuOrder.indexOf(a.props.name) - this.props.config.menuOrder.indexOf(b.props.name);
			});
		}

		return (
			<ul className="navigation-tree">
				{children}
			</ul>
		);
	}
}

export default NavigationTree;
