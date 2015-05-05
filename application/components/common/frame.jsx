import React from 'react';
import {Component, findDOMNode, PropTypes} from 'react';

import iframeWindow from '../../utils/iframe-window';

class Frame extends Component {
	static displayName = 'Frame';

	static propTypes = {
		'src': PropTypes.string.isRequired,
		'id': PropTypes.string.isRequired
	};

	constructor() {
		super();
		this.onMessage = this.onMessage.bind(this);
	}

	state = {
		'height': 0
	};

	componentDidMount() {
		let frame = findDOMNode(this);
		frame.contentWindow.postMessage({'type': 'rubberband', 'id': this.props.id }, '*');
		window.addEventListener('message', this.onMessage, false);
		iframeWindow(frame);
	}

	componentWillUnmount() {
		window.removeEventListener('message', this.onMessage);
	}

	onMessage(e) {
		if (e.data.type !== 'rubberband') {
			return;
		}

		if (e.data.id !== this.props.id) {
			return;
		}

		window.requestAnimationFrame(() => this.setState({'height': e.data.height}));
	}

	render () {
		return (
			<iframe {...this.props} key={this.props.id} style={{ height: this.state.height }} />
		);
	}
}

export default Frame;
