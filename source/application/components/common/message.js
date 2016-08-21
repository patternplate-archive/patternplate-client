import React, {Component, PropTypes as t} from 'react';
import {Link} from 'react-router';
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
		base: t.string.isRequired,
		onTimeRequest: t.func.isRequired,
		onDismiss: t.func.isRequired,
		onRetry: t.func.isRequired,
		payload: t.object
	};

	static defaultProps = {
		onTimeRequest: noop,
		onDismiss: noop,
		onRetry: noop
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

	handleRetryClick() {
		this.props.onRetry(this.props.payload);
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
						{
							props.retry &&
								<button
									onClick={this.handleRetryClick}
									type="button"
									className="message__button"
									title={`Retry loading ${props.pattern}`}
									>
									Retry
								</button>
						}
						<button
							onClick={this.handleDismissClick}
							type="button"
							className="message__button"
							title={`Dismiss message with title ${props.title}`}
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
							<Link
								to={{
									pathname: `${props.base}pattern/${props.payload.id}`,
									query: {...props.location.query, ...props.payload.query}
								}}
								className="message__field"
								>
								<Icon base={props.base} symbol="pattern"/>
								{props.pattern}
							</Link>
					}
					{
						props.file &&
							<div className="message__field">
								<Icon base={props.base} symbol="documentation"/>
								{props.file.slice(-50)}
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
