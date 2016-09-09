import React, {PropTypes as types} from 'react';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';
import classnames from 'classnames';
import {omit} from 'lodash';
import Icon from '../common/icon';

function getPathName(...fragments) {
	const raw = fragments
		.join('/')
		.split('/')
		.filter(Boolean)
		.map(fragment => fragment === '/' ? '' : fragment)
		.filter(Boolean)
		.join('/');
	const rawish = raw === '' ? '/' : raw;
	const pre = rawish[0] === '/' ? '' : '/';
	const post = rawish[rawish.length - 1] === '/' ? '' : '/';
	return `${pre}${rawish}${post}`;
}

export default class NavigationItem extends React.Component {
	displayName = 'NavigationItem';

	static propTypes = {
		base: types.string.isRequired,
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
		]),
		children: types.oneOfType([
			types.node,
			types.arrayOf(types.node)
		]),
		onClick: types.func,
		location: types.object,
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
		const {props: p} = this;
		const {component: Component} = this.props;

		const modifiers = {
			'child-active': p.active,
			'hidden': p.hidden,
			'anchored': p.anchored
		};

		const itemClassName = classnames(`navigation-item navigation-item--${p.type}`, modifiers);
		const linkClassName = classnames('navigation-link', modifiers);
		const pathname = getPathName(p.base, p.linkTo, p.id);
		const to = {pathname, query: omit(p.location.query, ['menu-enabled'])};
		const title = p.title || `Navigate to ${p.name} ${p.type}`;

		return (
			<Component className={itemClassName}>
				<Link
					onClick={this.handleClick}
					to={to}
					title={title}
					className={linkClassName}
					>
					<Icon base={p.base} symbol={p.symbol}/>
					<span>{p.name}</span>
				</Link>
				{
					p.active && this.props.children
				}
			</Component>
		);
	}
}
