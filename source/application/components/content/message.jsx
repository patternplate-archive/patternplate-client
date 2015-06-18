import React from 'react';
import {PropTypes, Component} from 'react';

class Message extends Component {
	static propTypes = {
		'type': PropTypes.oneOf(['info', 'error', 'success'])
	};

	onButtonClick = () => {
		this.props.manager.pull(this.props.index);
	}

	render = () => {
		let style = {
			bottom: `${this.props.index*50}px`
		};

		return (
			<div className={`message ${this.props.type}`} style={style}>
				<div className="message-container" key="single">
					<div className="message-content">{this.props.children}</div>
					<button onClick={this.onButtonClick} className="message-close" type="button">Close</button>
				</div>
			</div>
		);
	}
}

export default Message;
