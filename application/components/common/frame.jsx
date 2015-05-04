import React from 'react';
import {Component, findDOMNode, PropTypes} from 'react';

class Frame extends Component {
	static displayName = 'Frame';

	state = {
		'height': 0
	};

	static propTypes = {
		'src': PropTypes.string.isRequired,
		'id': PropTypes.string.isRequired
	};

	componentDidMount() {
		let frame = findDOMNode(this);
		frame.contentWindow.postMessage({'type': 'rubberband', 'id': this.props.id }, '*');
		window.addEventListener('message', (e) => this.onMessage(e), false);
	}

	componentDidUnmount() {
		window.removeEventListener('message', (e) => this.onMessage(e));
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
			<iframe {...this.props} style={{ height: this.state.height }} />
		);
	}
}

export default Frame;
