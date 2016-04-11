import React, {PropTypes as types, Component} from 'react';
import autobind from 'autobind-decorator';

class Message extends Component {
	static propTypes = {
		type: types.oneOf(['info', 'error', 'success', 'warn']),
		manager: types.object,
		index: types.number,
		children: types.oneOfType([
			types.node,
			types.arrayOf(types.node)
		])
	};

	@autobind
	handleButtonClick() {
		this.props.manager.pull(this.props.index);
	}

	render = () => {
		const style = {
			bottom: `${this.props.index * 50}px`
		};

		return (
			<div className={`message ${this.props.type}`} style={style}>
				<div className="message-container" key="single">
					<div className="message-content">{this.props.children}</div>
					<button
						onClick={this.handleButtonClick}
						className="message-close"
						type="button"
						>
							Close
					</button>
				</div>
			</div>
		);
	}
}

export default Message;
