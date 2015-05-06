import React from 'react';
import classnames from 'classnames';
import {PropTypes} from 'react';

class Icon extends React.Component {
	displayName = 'Icon';

	static defaultProps = {
		'uri': '/static/images/icons.svg',
		'fallback': true,
		'inline': false
	};

	static propTypes = {
		'uri': PropTypes.string.isRequired,
		'symbol': PropTypes.string.isRequired,
		'className': PropTypes.string,
		'fallback': PropTypes.bool.isRequired,
		'inline': PropTypes.bool.isRequired
	};

	render () {
		let className = classnames('icon', this.props.className);
		let textClassName = classnames('svg-text', {'svg-fallback': this.props.fallback});

		let href = this.props.inline ? `#${this.props.symbol}` : `${this.props.uri}#${this.props.symbol}`;
		let text = this.props.children ? <div className={textClassName}>{this.props.children}</div> : '';

		let svg = `<svg class="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ><use xlink:href="${href}" /></svg>`;

		return (
			<div className={className}>
				<div className="svg-icon" dangerouslySetInnerHTML={{'__html': svg}} />
				{text}
			</div>
		);
	}
}

export default Icon;
