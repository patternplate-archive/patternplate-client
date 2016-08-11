import React, {PropTypes as types} from 'react';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';
import classnames from 'classnames';
import {pick} from 'lodash';

import Icon from '../common/icon';

export default class NavigationItem extends React.Component {
	displayName = 'NavigationItem';

	static propTypes = {
		component: types.node,
		active: types.bool,
		hidden: types.bool,
		anchored: types.bool,
		linkTo: types.string,
		name: types.string.isRequired,
		symbol: types.string,
		searchQuery: types.string,
		id: types.oneOfType([
			types.string,
			types.number
		]).isRequired,
		children: types.oneOfType([
			types.node,
			types.arrayOf(types.node)
		]),
		onClick: types.func
	};

	static defaultProps = {
		component: 'li',
		active: false,
		hidden: false,
		linkTo: 'pattern',
		onClick: () => {}
	};

	@autobind
	handleClick(e) {
		this.props.onClick(e, this);
	}

	render() {
		const {anchored, name, symbol, active, id, hidden, searchQuery} = this.props;
		const {component: Component} = this.props;

		const splat = {splat: id};
		const modifiers = {
			'child-active': active,
			hidden,
			anchored
		};

		const itemClassName = classnames('navigation-item', modifiers);
		const linkClassName = classnames('navigation-link', modifiers);

		return (
			<Component className={itemClassName}>
				<Link
					onClick={this.handleClick}
					to={this.props.linkTo}
					params={splat}
					query={{search: searchQuery}}
					title={name}
					className={linkClassName}
					>
					{symbol && <Icon symbol={symbol}/>}
					{name}
				</Link>
				{this.props.children}
			</Component>
		);
	}
}
