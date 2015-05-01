import React from 'react';
import {Link} from 'react-router';

class NavigationItem extends React.Component {
	displayName = 'NavigationItem';

	render () {
		return (
			<li className="navigation-item">
				<Link to="pattern" params={{ 'splat': this.props.id }}>{this.props.name}</Link>
				{this.props.children}
			</li>
		);
	}
}

export default NavigationItem;
