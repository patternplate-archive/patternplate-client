import React from 'react';

import NavigationItem from './navigation-item';

class NavigationTree extends React.Component {
	displayName = 'NavigationTree';

	render () {
		let children = this.children ? this.children.map((child) => {
			return React.cloneElement(child);
		}) : [];

		for (let keyName of Object.keys(this.props.data)) {
			let sub = this.props.data[keyName];

			if ( typeof sub === 'object' ) {
				let treeId = keyName.toLowerCase();

				children.push(
					<NavigationItem name={keyName} id={treeId} key={treeId}>
						<NavigationTree data={sub} id={treeId} />
					</NavigationItem>
				);
			} else {
				let childId = [this.props.id, keyName].join('/');
				children.push(<NavigationItem name={sub} id={childId} key={childId} />)
			}
		}

		return (
			<ul className="navigation-tree">
				{children}
			</ul>
		);
	}
}

export default NavigationTree;
