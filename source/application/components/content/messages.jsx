import {EventEmitter} from 'events';
import React, {PropTypes as t, Component} from 'react';
import btoa from 'btoa';

import Message from './message';
import pure from 'pure-render-decorator';

@pure
class Messages extends Component {
	static displayName = 'Messages';

	static defaultProps = {
		max: 3,
		messages: []
	};

	static propTypes = {
		max: t.number.isRequired,
		messages: t.array.isRequired,
		eventEmitter: t.instanceOf(EventEmitter)
	};

	state = {
		messages: []
	}

	constructor() {
		super();
		this.push = this.push.bind(this);
	}

	componentWillMount() {
		this.props.messages.forEach(message => {
			this.push(message.content, message.type);
		});

		this.props.eventEmitter.addListener('error', this.pushError);
		this.props.eventEmitter.addListener('message', this.push);
	}

	componentWillUnmount() {
		this.props.eventEmitter.removeListener('error', this.pushError);
		this.props.eventEmitter.removeListener('message', this.push);
	}

	pushError = message => {
		return this.push(message, 'error');
	}

	push(message, type = 'info') {
		let messages = this.state.messages.slice(0);
		messages.push({
			content: message,
			type,
			date: Date.now(),
			hash: btoa(`${message.message}${Date.now()}`)
		});
		messages = messages.slice(this.props.max * -1);
		this.setState({messages});
	}

	pull(index) {
		const messages = this.state.messages.slice(0);
		messages.splice(index, 1);
		this.setState({messages});
	}

	render() {
		const children = this.state.messages
			.sort((a, b) => a.date - b.date)
			.map((message, index) => {
				return (
					<Message
						key={message.hash}
						index={index}
						date={message.date}
						type={message.type}
						manager={this}
						>
						{message.content}
					</Message>
				);
			});

		return (
			<div className="messages">
				{children}
			</div>
		);
	}
}

export default Messages;
