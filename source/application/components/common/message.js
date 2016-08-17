import React, {Component, PropTypes as t} from 'react';
import join from 'classnames';
import autobind from 'autobind-decorator';
import pure from 'pure-render-decorator';
import {noop} from 'lodash';
// import ago from 's-ago';

import Icon from '../common/icon';

@pure
@autobind
export default class Message extends Component {
	static propTypes = {
		onTimeRequest: t.func.isRequired,
		onDismiss: t.func.isRequired
	};

	static defaultProps = {
		onTimeRequest: noop,
		onDismiss: noop
	};

	/* componentDidMount() {
		this.interval = global.setInterval(this.props.onTimeRequest, 1000);
	}

	componentWillUnmount() {
		global.clearInterval(this.interval);
	} */
	handleDismissClick() {
		this.props.onDismiss(this.props.id);
	}

	render() {
		const {props} = this;
		const className = join('message', `message--${props.type}`);
		return (
			<div className={className}>
				<div className="message__header">
					{
						props.title &&
							<div className="message__title">
								{props.title}
							</div>
					}
					<div className="message__action">
						<button
							onClick={this.handleDismissClick}
							type="button"
							className="message__button"
							>
							Dismiss
						</button>
					</div>
				</div>
				<div className="message__body">
					<pre className="message__preformatted">
						{props.body}
					</pre>
				</div>
				<div className="message__meta">
					{
						props.pattern &&
							<div className="message__field">
								<Icon symbol="pattern"/>
								{props.pattern}
							</div>
					}
					{
						/* props.timestamp &&
							<div className="message__field">
								<Icon symbol="globals"/>
								{ago(new Date(props.timestamp))}
								{props.time - props.timestamp}
							</div> */
					}
				</div>
			</div>
		);
	}
}
