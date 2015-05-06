import React from 'react';
import {PropTypes, Component} from 'react';

import Message from './message';

class Messages extends Component {
	static displayName = 'Messages';

	static defaultProps = {
		'messages': [],
		'max': 3
	};

	static propTypes = {
		'messages': PropTypes.array,
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
		this.props.eventEmitter.addListener('error', this.push);
		this.props.eventEmitter.addListener('message', this.push);
	}

	componentWillUnmount() {
		this.props.eventEmitter.removeListener('error', this.push);
		this.props.eventEmitter.removeListener('message', this.push);
	}

	push(message) {
		let messages = this.state.messages.slice(0);
		messages.push({ 'content': message, 'date': Date.now(), 'hash': window.btoa(`${message.message}${Date.now()}`) });
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
				let style = { 'bottom': `${50*index}px` };
				return <Message key={message.hash} index={index} date={message.date} manager={this}>{message.content}</Message>
			});

		return (
			<div className="messages">{children}</div>
		);
	}
}

export default Messages;
