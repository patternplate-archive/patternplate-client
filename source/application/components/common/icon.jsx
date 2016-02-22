import {parse} from 'url';

import React from 'react';
import classnames from 'classnames';
import {PropTypes} from 'react';

function isURI(input) {
	const {host, hostname} = parse(input);
	return [host, hostname].every(Boolean);
}

class Icon extends React.Component {
	displayName = 'Icon';

	static defaultProps = {
		uri: '/static/images/icons.svg',
		fallback: true,
		inline: false
	};

	static propTypes = {
		uri: PropTypes.string.isRequired,
		symbol: PropTypes.string.isRequired,
		className: PropTypes.string,
		fallback: PropTypes.bool.isRequired,
		inline: PropTypes.bool.isRequired
	};

	render() {
		const className = classnames('icon', this.props.className);
		const textClassName = classnames(
			'svg-text',
			{
				'svg-fallback': this.props.fallback
			});

		const fragment = this.props.inline ?
			`#${this.props.symbol}` :
			`${this.props.uri}#${this.props.symbol}`;

		const href = isURI(this.props.symbol) ?
			this.props.symbol :
			fragment;

		const text = this.props.children ?
			<div className={textClassName}>{this.props.children}</div> :
			'';

		const svg = [
			`<svg class="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`,
			`<use xlink:href="${href}" />`,
			`</svg>`
		].join('');

		return (
			<div className={className}>
				<div
					className="svg-icon"
					dangerouslySetInnerHTML={{__html: svg}}
					/>
				{text}
			</div>
		);
	}
}

export default Icon;
