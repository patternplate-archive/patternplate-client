import {parse} from 'url';

import React, {Component, PropTypes as types} from 'react';
import autobind from 'autobind-decorator';
import pure from 'pure-render-decorator';

import cx from 'classnames';
import fetch from 'isomorphic-fetch';
import {memoize} from 'lodash';

let supportsExternalFragments = null;

function isURI(input) {
	const {host, hostname} = parse(input);
	return [host, hostname].every(Boolean);
}

const injectSVGSprite = memoize(async uri => {
	if (!uri) {
		return;
	}
	const {document} = global;
	const response = await fetch(uri);
	const text = await response.text();
	const container = document.createElement('div');
	container.innerHTML = text;
	container.style.height = 0;
	container.style.width = 0;
	container.style.visibility = 'hidden';
	container.style.overflow = 'hidden';
	document.body.insertBefore(container, document.body.firstChild);
});

@pure
class Icon extends Component {
	displayName = 'Icon';

	static propTypes = {
		uri: types.string.isRequired,
		symbol: types.string.isRequired,
		className: types.string,
		fallback: types.bool.isRequired,
		inline: types.bool.isRequired,
		children: types.oneOfType([
			types.node,
			types.arrayOf(types.node)
		])
	};

	static defaultProps = {
		uri: '/static/images/patternplate-icons.svg',
		fallback: true,
		inline: false
	};

	usePolyfilling = null;
	useReference = null;

	state = {
		supportsExternalFragments: supportsExternalFragments === null ? true : supportsExternalFragments
	};

	componentDidMount() {
		const {useReference} = this;
		const {inline, uri} = this.props;

		// Determine support only once
		if (supportsExternalFragments === null && useReference && uri && !inline) {
			this.usePolyfilling = setTimeout(() => {
				const {width} = useReference.getBoundingClientRect();
				supportsExternalFragments = width > 0;
				this.setState({
					supportsExternalFragments
				});
			}, 0);
		}
	}

	componentWillUnmount() {
		clearTimeout(this.usePolyfilling);
	}

	componentWillUpdate(nextProps, nextState) {
		const {uri, inline} = this.props;
		if (!nextState.supportsExternalFragments && uri && !inline) {
			injectSVGSprite(uri);
		}
	}

	@autobind
	getUseReference(ref) {
		this.useReference = ref;
	}

	render() {
		const {
			className: userClassName,
			uri,
			fallback,
			symbol,
			inline,
			children
		} = this.props;

		const {
			supportsExternalFragments
		} = this.state;

		const className = cx('icon', userClassName);
		const textClassName = cx(
			'svg-text',
			{
				'svg-fallback': fallback
			});

		const fragment = inline || !supportsExternalFragments ?
			`#${symbol}` :
			`${uri}#${symbol}`;

		const href = isURI(this.props.symbol) ?
			this.props.symbol :
			fragment;

		return (
			<div className={className}>
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
			</div>
		);
	}
}

export default Icon;
