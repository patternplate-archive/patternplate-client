import path from 'path';
import color from 'color';
import React, {PropTypes as types} from 'react';
import tag from 'tag-hoc';
import styled from 'styled-components';

import Icon from '../common/icon';
import Link from '../common/link';

export default class NavigationItem extends React.Component {
	static propTypes = {
		className: types.string,
		active: types.bool,
		hidden: types.bool,
		anchored: types.bool,
		linkTo: types.string,
		name: types.string.isRequired,
		symbol: types.string.isRequired,
		symbolActive: types.string,
		to: types.string,
		id: types.oneOfType([
			types.string,
			types.number
		]),
		children: types.oneOfType([
			types.node,
			types.arrayOf(types.node)
		]),
		type: types.string
	};

	static defaultProps = {
		component: 'li',
		active: false,
		hidden: false,
		linkTo: 'pattern'
	};

	render() {
		const {props} = this;

		if (props.hide && props.hidden) {
			return null;
		}

		const title = props.title || `Navigate to ${props.name} ${props.type}`;
		const symbol = props.active ? props.symbolActive : props.symbol;

		return (
			<StyledNavigationItem
				active={props.active}
				className={props.className}
				type={props.type}
				>
				<StyledNavigationLink
					active={props.active}
					href={strip([props.linkTo, props.to || props.id].join('/'))}
					type={props.type}
					title={title}
					>
					<StyledIcon active={props.active} size="m" symbol={symbol}/>
					<span>{props.name}</span>
				</StyledNavigationLink>
				{
					props.active && props.children
				}
			</StyledNavigationItem>
		);
	}
}

const StyledIcon = styled(Icon)`
	fill: ${props => props.theme.color};
	${props => props.active && `fill: ${color(props.theme.active)}`};
	margin: 5px 10px 5px 6px;
`;

const StyledNavigationItem = styled.div`
	width: 100%;
	box-sizing: border-box;
	border-left: ${props => props.type === 'folder' && `3px solid transparent`};
	margin-left: 1px;
	background: ${props => props.theme.tint};
	${props => props.active && `border-color: ${color(props.theme.active).fade(0.6).toString()}`};
`;

const LinkTag = tag(['active', 'type'])(Link);

const StyledNavigationLink = styled(LinkTag)`
	box-sizing: border-box;
	display: flex;
	width: 100%;
	align-items: center;
	text-decoration: none;
	font-size: 16px;
	line-height: 20px;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	${props => props.active && `
		margin-left: ${props.type === 'folder' ? '-3px' : '-4px'};
		padding-left: ${props.type === 'folder' ? 0 : '1px'};
		border-left: 3px solid ${props.theme.active};
	`};
	:link,
	:visited {
		color: ${props => props.theme.color};
		${props => props.active && `color: ${color(props.theme.active)}`};
	}
`;

function strip(b) {
	return path.join(path.dirname(b), path.basename(b, path.extname(b)));
}
