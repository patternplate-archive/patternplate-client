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
		let { name, symbol, active } = this.props;

		let linkClassName = classnames('navigation-link', { 'child-active': active });
		let itemClassName = classnames('navigation-item', { 'child-active': active });

		return (
			<li className={ itemClassName }>
				<Link to={this.props.linkTo} params={{ 'splat': this.props.id }} title={name} className={ linkClassName }>
					{symbol && <Icon symbol={symbol} />}
					{name}
				</Link>
				{this.props.children}
			</li>
		);
	}
}

export default NavigationItem;
