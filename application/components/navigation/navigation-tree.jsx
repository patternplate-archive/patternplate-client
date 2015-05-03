import React from 'react';

import NavigationItem from './navigation-item.jsx';

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

			if ( typeof sub === 'object' ) {
				let treeId = keyName.toLowerCase();
				let treeFragments = treeId.split('/');
				let depth = treeFragments.length;
				let active = treeFragments[depth - 1] === activePath[depth - 1];

				children.push(
					<NavigationItem name={keyName} id={treeId} key={treeId} active={active}>
						<NavigationTree data={sub} id={treeId} path={this.props.path} />
					</NavigationItem>
				);
			} else {
				let childId = [this.props.id, keyName].join('/');
				children.push(<NavigationItem name={sub} id={childId} key={childId} />)
			}
		}

		if (this.props.config) {
			children.sort((a, b) => {
				return this.props.config.menuOrder.indexOf(a._store.props.name) - this.props.config.menuOrder.indexOf(b._store.props.name);
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
