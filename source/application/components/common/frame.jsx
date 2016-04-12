import React, {Component, PropTypes as types} from 'react';
import {findDOMNode} from 'react-dom';
import {host} from 'rubber-band';
import pure from 'pure-render-decorator';

import iframeWindow from '../../utils/iframe-window';

@pure
class Frame extends Component {
	static displayName = 'Frame';

	static propTypes = {
		src: types.string.isRequired,
		id: types.string.isRequired
	};

	state = {
		height: 0
	};

	componentDidMount() {
		const frame = findDOMNode(this);
		this.frame = host(frame, {
			callback: (frame, height) => this.onFrameResize(height)
		});
		this.frame.request();
		iframeWindow(frame);
	}

	componentWillUnmount() {
		this.frame.stop();
	}

	onFrameResize(height) {
		this.setState({
			height
		});
	}

	render() {
		const {height} = this.state;
		const {id, ...props} = this.props;
		const style = {height};

		return (
			<iframe
				{...props}
				key={id}
				style={style}
				/>
		);
	}
}

export default Frame;
