import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';

import NavigationTree from './navigation-tree';
import NavigationItem from './navigation-item';
import Icon from '../common/icon';

class Navigation extends React.Component {
	displayName = 'Navigation';

	state = {
		expanded: true
	}

	toggleMode = (e) => {
		e.preventDefault();
		this.setState({ expanded: !this.state.expanded });
	}

	render () {
		let className = classnames('navigation', {'slim': !this.state.expanded});
		return (
			<nav className={ className }>
				<NavigationTree data={this.props.navigation} path={this.props.path} config={this.props.config}>
					<NavigationItem name="Home" symbol="home" id={0} key="root" linkTo="/"/>
				</NavigationTree>
				<button className="toggleMode" onClick={this.toggleMode}>
					{ this.state.expanded ? <Icon symbol="arrow-double-left"></Icon> : <Icon symbol="arrow-double-right"></Icon> }
				</button>
			</nav>
		);
	}
}

export default Navigation;
