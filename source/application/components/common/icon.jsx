import {parse} from 'url';

import React, {PropTypes as types} from 'react';
import autobind from 'autobind-decorator';
import cx from 'classnames';
import fetch from 'isomorphic-fetch';
import {memoize} from 'lodash';

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
	document.body.insertBefore(container.firstChild, document.body.firstChild);
});

class Icon extends React.Component {
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
		uri: '/static/images/icons.svg',
		fallback: true,
		inline: false
	};

	usePolyfilling = null;
	useReference = null;

	state = {
		supportsExternalFragments: true
	};

	componentDidMount() {
		const {useReference} = this;
		const {inline, uri} = this.props;

		if (useReference && uri && !inline) {
			this.usePolyfilling = setTimeout(() => {
				const {width} = useReference.getBoundingClientRect();
				this.setState({
					supportsExternalFragments: width > 0
				});
			}, 0);
		}
	}

	componentWillUnmount() {
		clearTimeout(this.usePolyfilling);
	}

	componentWillUpdate(nextProps, nextState) {
		const {supportsExternalFragments} = nextState;
		const {uri, symbol, inline} = this.props;
		if (!supportsExternalFragments && uri && !inline) {
			console.log(`Downloading ${uri} for fragment ${symbol}`);
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
					<svg className="svg">
						<use ref={this.getUseReference} xlinkHref={href}/>
					</svg>
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
