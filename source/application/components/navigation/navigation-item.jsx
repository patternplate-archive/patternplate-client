import React from 'react';
import classnames from 'classnames';

import {Link} from 'react-router';

import Icon from '../common/icon';

class NavigationItem extends React.Component {
	displayName = 'NavigationItem';

	static defaultProps = {
		'active': false,
		'linkTo': 'pattern'
	};

	render () {
		let linkClassName = classnames('navigation-link', {'child-active': this.props.active});
		let itemClassName = classnames('navigation-item', {'child-active': this.props.active});

		return (
			<li className={ itemClassName }>
				<Link to={this.props.linkTo} params={{ 'splat': this.props.id }} title={this.props.name} className={ linkClassName }>
					<Icon symbol={this.props.name.toLowerCase()} />
					{this.props.name}
				</Link>
				{this.props.children}
			</li>
		);
	}
}

export default NavigationItem;
