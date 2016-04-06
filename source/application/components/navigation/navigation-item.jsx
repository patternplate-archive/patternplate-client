import React, {PropTypes as types} from 'react';
import classnames from 'classnames';
import {Link} from 'react-router';

import Icon from '../common/icon';

export default class NavigationItem extends React.Component {
	displayName = 'NavigationItem';

	static propTypes = {
		active: types.bool,
		hidden: types.bool,
		linkTo: types.string,
		name: types.string.isRequired,
		symbol: types.string,
		id: types.oneOfType([
			types.string,
			types.number
		]).isRequired,
		children: types.oneOfType([
			types.node,
			types.arrayOf(types.node)
		])
	};

	static defaultProps = {
		active: false,
		hidden: false,
		linkTo: 'pattern'
	};

	render() {
		const {name, symbol, active, id, hidden} = this.props;

		const splat = {splat: id};
		const modifiers = {
			'child-active': active,
			'hidden': hidden
		};

		const linkClassName = classnames('navigation-link', modifiers);
		const itemClassName = classnames('navigation-item', modifiers);

		return (
			<li className={itemClassName}>
				<Link
					to={this.props.linkTo}
					params={splat}
					title={name}
					className={linkClassName}
					>
					{symbol && <Icon symbol={symbol}/>}
					{name}
				</Link>
				{this.props.children}
			</li>
		);
	}
}
