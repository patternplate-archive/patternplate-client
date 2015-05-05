import React from 'react';
import {host} from 'rubberband';
import {Component, findDOMNode, PropTypes} from 'react';

import iframeWindow from '../../utils/iframe-window';

class Frame extends Component {
	static displayName = 'Frame';

	static propTypes = {
		'src': PropTypes.string.isRequired,
		'id': PropTypes.string.isRequired
	};

	state = {
		'height': 0
	};

	componentDidMount() {
		let frame = findDOMNode(this);
		this.frame = host(frame, { 'callback': (frame, height) => this.onFrameResize(height) });
		this.frame.request();
		iframeWindow(frame);
	}

	componentWillUnmount() {
		this.frame.stop();
	}

	onFrameResize(height) {
		this.setState({
			'height': height
		});
	}

	render () {
		return (
			<iframe {...this.props} key={this.props.id} style={{ height: this.state.height }} />
		);
	}
}

export default Frame;
