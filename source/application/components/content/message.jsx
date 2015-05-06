import React from 'react';
import {findDOMNode, Component} from 'react';

class Message extends Component {
	static displayName = 'Message';

	state = {
		'style': { 'bottom': '-50px' },
	};

	onButtonClick() {
		this.props.manager.pull(this.props.index);
	}

	componentDidMount() {
		this.setState({'style': { 'bottom': `${this.props.index * 50}px` }});
	}

	componentWillReceiveProps(props) {
		this.setState({'style': { 'bottom': `${props.index * 50}px` }});
	}

	componentWillUnmount() {
		this.setState({'style': { 'bottom': '' }});
	}

	render () {
		return (
			<div className="message" style={this.state.style}>
				<div className="message-container" key="single">
					<div className="message-content">{this.props.children}</div>
					<button onClick={(e) => this.onButtonClick(e)} className="message-close" type="button">Close</button>
				</div>
			</div>
		);
	}
}

export default Message;
