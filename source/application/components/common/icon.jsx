import {parse} from 'url';

import React, {Component, PropTypes as types} from 'react';
import pure from 'pure-render-decorator';

import cx from 'classnames';

function isURI(input) {
	const {host, hostname} = parse(input);
	return [host, hostname].every(Boolean);
}

@pure
class Icon extends Component {
	displayName = 'Icon';

	static propTypes = {
		base: types.string.isRequired,
		uri: types.string.isRequired,
		symbol: types.string.isRequired,
		className: types.string,
		fallback: types.bool.isRequired,
		inline: types.bool.isRequired,
		children: types.oneOfType([
			types.node,
			types.arrayOf(types.node)
		]),
		description: types.string,
		style: types.object
	};

	static defaultProps = {
		uri: 'static/images/patternplate-icons.svg',
		fallback: true,
		inline: false
	};

	usePolyfilling = null;
	useReference = null;

	render() {
		const {
			base,
			className: userClassName,
			uri,
			fallback,
			symbol,
			inline,
			children,
			description,
			style
		} = this.props;

		const className = cx('icon', userClassName, {
			'icon--has-description': description
		});
		const textClassName = cx(
			'svg-text',
			{
				'svg-fallback': fallback
			});

		const fragment = inline ?
			`#${symbol}` :
			`${base}${uri}#${symbol}`;

		const href = isURI(this.props.symbol) ?
			this.props.symbol :
			fragment;

		return (
			<div className={className} style={style}>
				<div className="svg-icon">
				{
					<svg className="svg">
						<use ref={this.getUseReference} xlinkHref={href}/>
					</svg>
				}
				</div>
				{
					children &&
						<div className={textClassName}>
							{children}
						</div>
				}
				{
					description &&
						<small className="icon__description">
							{description}
						</small>
				}
			</div>
		);
	}
}

export default Icon;
