import cx from 'classnames';
import pure from 'pure-render-decorator';
import React, {Component, PropTypes as types} from 'react';
import {connect} from 'react-redux';

import isURI from '../../utils/is-uri';

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
		children: types.any,
		description: types.string,
		style: types.object,
		dispatch: types.func.isRequired
	};

	static defaultProps = {
		uri: 'static/images/patternplate-icons.svg',
		fallback: true,
		inline: false
	};

	static contextTypes = {
		support: types.shape({
			svg: types.bool.isRequired
		})
	};

	render() {
		const {
			base,
			className: userClassName,
			fallback,
			uri,
			symbol,
			inline,
			children,
			description,
			style
		} = this.props;

		const className = cx('icon', userClassName, {
			'icon--has-description': description
		});

		const textClassName = cx('svg-text');
		const textStyle = {display: fallback ? 'none' : null};

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
						<use xlinkHref={href}/>
					</svg>
				}
				</div>
				<div className={textClassName} style={textStyle}>
					{children}
				</div>
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

export default connect()(Icon);
