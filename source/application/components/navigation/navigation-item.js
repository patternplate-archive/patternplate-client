import color from 'color';
import React, {PropTypes as types} from 'react';
import tag from 'tag-hoc';
import styled from 'styled-components';

import Icon from '../common/icon';
import Link from '../common/link';
import Text from '../text';

export default class NavigationItem extends React.Component {
	constructor(...args) {
		super(...args);
		this.getRef = this.getRef.bind(this);
		this.getLinkRef = this.getLinkRef.bind(this);
		this.handleInterSection = this.handleInterSection.bind(this);
		this.state = {
			intersects: true
		};
	}

	getRef(ref) {
		this.ref = ref;
	}

	getLinkRef(ref) {
		this.link = ref;
	}

	componentWillUnmount() {
		if (this.observer && this.link) {
			this.observer.unobserve(this.link);
		}
	}

	componentDidMount() {
		if (this.props.active && this.ref && this.link) {
			this.observer = new global.IntersectionObserver(this.handleInterSection);
			this.observer.observe(this.link);

			setTimeout(() => {
				this.props.onScrollRequest({target: this.ref, props: this.props});
			});
		}
	}

	componentWillUpdate(next) {
		if (this.props.type === 'folder') {
			return;
		}
		if (next.active && this.ref) {
			this.props.onScrollRequest({target: this.ref, props: next});
		}
	}

	handleInterSection([e]) {
		if (!this.props.active || !this.props.type === 'folder') {
			return;
		}
		if (this.state.intersects !== e.isIntersecting) {
			this.setState({
				intersects: e.isIntersecting
			});
		}
	}

	render() {
		const {props} = this;
		const title = props.title || `Navigate to ${props.name} ${props.type}`;
		const symbol = props.active ? props.symbolActive : props.symbol;

		return (
			<StyledNavigationItem
				active={props.active}
				className={props.className}
				innerRef={this.getRef}
				type={props.type}
				>
				{(props.type === 'folder' && props.active && !this.state.intersects) &&
					<StyledNavigationLabel>
						<Text>{props.name}</Text>
					</StyledNavigationLabel>
				}
				<div ref={this.getLinkRef}>
					<StyledNavigationLink
						active={props.active}
						href={props.href}
						sticky={props.type === 'folder' && props.active}
						type={props.type}
						title={title}
						>
						<StyledIcon active={props.active} size="m" symbol={symbol}/>
						<span>{props.name}</span>
					</StyledNavigationLink>
				</div>
				{
					props.active && props.children
				}
			</StyledNavigationItem>
		);
	}
}

NavigationItem.propTypes = {
	active: types.bool,
	children: types.any,
	className: types.string,
	href: types.string.isRequired,
	id: types.string.isRequired,
	name: types.string.isRequired,
	onScrollRequest: types.func,
	symbol: types.string.isRequired,
	symbolActive: types.string,
	title: types.string,
	type: types.string.isRequired
};

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

const StyledNavigationLabel = styled.div`
	box-sizing: border-box;
	position: -webkit-sticky;
	position: sticky;
	z-index: 1;
	top: 0;
	margin: 0;
	font-size: 14px;
	padding: 3px 15px;
	border-width: 1px 0;
	border-style: solid;
	border-color: ${props => props.theme.border};
	color: ${props => props.theme.color};
	background: ${props => props.theme.background};
`;
