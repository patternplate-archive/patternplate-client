import React from 'react';
import classnames from 'classnames';

import {Link} from 'react-router';

import Icon from '../common/icon.jsx';

class NavigationItem extends React.Component {
	displayName = 'NavigationItem';

	static defaultProps = {
		'active': false
	};

	render () {
		let className = classnames('navigation-link', {'child-active': this.props.active});

		return (
			<li className="navigation-item">
				<Link to="pattern" params={{ 'splat': this.props.id }} className={className}>
					<Icon symbol={this.props.name.toLowerCase()} />
					{this.props.name}
				</Link>
				{this.props.children}
			</li>
		);
	}
}

export default NavigationItem;
