import React from 'react';

import NavigationTree from './navigation-tree';

class Navigation extends React.Component {
	displayName = 'Navigation';

	render () {
		return (
			<nav className="navigation">
				<NavigationTree data={this.props.navigation} />
			</nav>
		);
	}
}

export default Navigation;
