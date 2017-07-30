import path from 'path';
import React, {PropTypes as types} from 'react';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';
import classnames from 'classnames';
import {omit} from 'lodash';
import Icon from '../common/icon';

export default class NavigationItem extends React.Component {
	static propTypes = {
		base: types.string.isRequired,
		component: types.node,
		active: types.bool,
		hidden: types.bool,
		anchored: types.bool,
		linkTo: types.string,
		name: types.string.isRequired,
		query: types.object.isRequired,
		symbol: types.string.isRequired,
		symbolActive: types.string,
		searchQuery: types.string,
		to: types.string,
		id: types.oneOfType([
			types.string,
			types.number
		]),
		children: types.oneOfType([
			types.node,
			types.arrayOf(types.node)
		]),
		onClick: types.func,
		type: types.string
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
		const {props} = this;
		const {component: Component} = props;

		const modifiers = {
			'child-active': props.active,
			'hidden': props.hidden,
			'anchored': props.anchored
		};

		const itemClassName = classnames(`navigation-item navigation-item--${props.type}`, modifiers);
		const linkClassName = classnames('navigation-link', modifiers);
		const pathname = getPathName(props.base, props.linkTo, props.to || props.id);
		const to = {pathname, query: omit(props.query, ['menu-enabled'])};
		const title = props.title || `Navigate to ${props.name} ${props.type}`;
		const symbol = props.active ? props.symbolActive : props.symbol;

		return (
			<Component className={itemClassName}>
				<Link
					onClick={this.handleClick}
					to={to}
					title={title}
					className={linkClassName}
					>
					<Icon symbol={symbol}/>
					<span>{props.name}</span>
				</Link>
				{
					props.active && props.children
				}
			</Component>
		);
	}
}

function getPathName(...fragments) {
	return strip(path.join(...fragments.filter(Boolean)));
}

function strip(b) {
	return path.join(path.dirname(b), path.basename(b, path.extname(b)));
}
