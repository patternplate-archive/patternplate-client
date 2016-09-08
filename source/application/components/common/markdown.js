import React, {Component, PropTypes as t} from 'react';
import Remarkable from 'react-remarkable';
import {emojify} from 'node-emoji';
import md5 from 'md5';
import toHtml from 'hast-util-to-html';
import join from 'classnames';

import pure from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import {requestIdleCallback, cancelIdleCallback} from 'request-idle-callback';

@pure
@autobind
export default class Markdown extends Component {
	static propTypes = {
		base: t.string.isRequired,
		className: t.string,
		source: t.string,
		highlights: t.object.isRequired,
		onHighlightRequest: t.func.isRequired
	};

	static defaultProps = {
		source: ''
	};

	jobs = [];

	onHighlight(payload, language) {
		if (!payload) {
			return '';
		}

		if (!language) {
			return '';
		}

		const {props} = this;
		const {highlights} = props;

		const id = ['highlight', language, md5(payload)].join(':');
		const waits = ['errors', 'queue'].some(key => highlights[key].find(item => item.id === id));

		if (waits) {
			return '';
		}

		const result = highlights.results.find(result => result.id === id);

		if (result) {
			return toHtml(result.payload);
		}

		const worker = `${props.base}script/lowlight.bundle.js`;
		const options = {id, payload, language, worker};

		this.jobs = [
			...this.jobs,
			requestIdleCallback(() => {
				props.onHighlightRequest(options);
			}, 5000)
		];

		return '';
	}

	componentWillUnmount() {
		this.jobs.forEach(job => cancelIdleCallback(job));
	}

	render() {
		const className = join('markdown', this.props.className);
		const source = String(this.props.source);
		return (
			<div className={className}>
				<Remarkable
					container="div"
					source={emojify(source)}
					options={{
						html: true,
						xhtmlOut: true,
						langPrefix: 'hljs ',
						highlight: this.onHighlight
					}}
					/>
			</div>
		);
	}
}
