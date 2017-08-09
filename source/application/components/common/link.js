import url from 'url';
import React, {PropTypes as t} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';

class LinkComponent extends React.Component {
	constructor(...args) {
		super(...args);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.props.onClick(e, this.props.href);
	}

	render() {
		const {props} = this;
		return (
			<a
				className={props.className}
				href={props.href}
				onClick={this.handleClick}
				onMouseOver={props.onHover}
				title={props.title}
				data-id={props['data-id']}
				>
				{props.children}
			</a>
		);
	}
}

export default connect(mapProps, mapDispatch)(LinkComponent);

function mapProps(state, own) {
	const location = state.routing.locationBeforeTransitions;
	const parsed = own.href ? url.parse(own.href) : location;
	const query = own.query || location.query;

	return {
		href: url.format({
			pathname: url.resolve(state.base, parsed.pathname),
			query: {...location.query, ...parsed.query, ...query},
			hash: own.hash
		}),
		children: own.children,
		className: own.className,
		onClick: own.onClick,
		title: own.title
	};
}

function mapDispatch(dispatch, own) {
	return bindActionCreators({
		onClick(e, href) {
			if (own.onClick) {
				own.onClick(e);
				return;
			}
			e.preventDefault();
			return push(href);
		}
	}, dispatch);
}

LinkComponent.propTypes = {
	children: t.any.isRequired,
	className: t.string,
	href: t.string.isRequired,
	onClick: t.func,
	title: t.string.isRequired
};
