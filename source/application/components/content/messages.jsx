import React from 'react';
import {PropTypes, Component} from 'react';

import Message from './message';

class Messages extends Component {
	static displayName = 'Messages';

	static defaultProps = {
		'max': 3
	};

	static propTypes = {
		'max': PropTypes.number.isRequired
	};

	state = {
		'messages': []
	}

	constructor() {
		super();
		this.push = this.push.bind(this);
	}

	componentWillMount() {
		this.props.eventEmitter.addListener('error', this.pushError);
		this.props.eventEmitter.addListener('message', this.push);
	}

	componentWillUnmount() {
		this.props.eventEmitter.removeListener('error', this.pushError);
		this.props.eventEmitter.removeListener('message', this.push);
	}

	pushError = (message) => {
		return this.push(message, 'error');
	}

	push(message, type='info') {
		let messages = this.state.messages.slice(0);
		messages.push({
			'content': message,
			'type': type,
			'date': Date.now(),
			'hash': window.btoa(`${message.message}${Date.now()}`)
		});
		messages = messages.slice(this.props.max * -1);

		this.setState({
			'messages': messages
		});
	}

	pull(index) {
		let messages = this.state.messages.slice(0);
		messages.splice(index, 1);

		this.setState({
			'messages': messages
		});
	}

	render () {
		let children = this.state.messages
			.sort((a, b) => a.date - b.date)
			.map((message, index) => {
				return <Message key={message.hash} index={index} date={message.date} type={message.type} manager={this}>{message.content}</Message>
			});

		return (
			<div className="messages">{children}</div>
		);
	}
}

export default Messages;
