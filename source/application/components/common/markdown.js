import React, {Component, PropTypes as t} from 'react';
import Remarkable from 'react-remarkable';
import {memoize} from 'lodash';
import {emojify} from 'node-emoji';
import md5 from 'md5';

import pure from 'pure-render-decorator';
import autobind from 'autobind-decorator';

const startWorker = memoize(url => {
	const {Worker} = global;
	return new Worker(url);
});

@pure
@autobind
class Markdown extends Component {
	static propTypes = {
		base: t.string.isRequired,
		source: t.string.isRequired
	};

	state = {
		highlights: {}
	};

	jobs = {};

	componentDidMount() {
		const {base} = this.props;
		const worker = startWorker(`${base}script/highlight.bundle.js`);
		worker.addEventListener('message', this.onWorkerMessage);
		this.worker = worker;

		Object.entries(this.jobs).forEach(entry => {
			const [id, job] = entry;
			this.worker.postMessage(JSON.stringify({
				id,
				payload: job.code,
				language: job.language
			}));
		});
	}

	componentWillUnmount() {
		if (this.worker) {
			this.worker.removeEventListener('message', this.onWorkerMessage);
		}
	}

	onWorkerMessage(e) {
		const {data} = e;
		const {payload, id} = JSON.parse(data);
		if (id in this.jobs) {
			this.setState({
				highlights: {
					...this.state.highlights,
					[id]: payload
				}
			});
		}
	}

	onHighlight(code, language) {
		const key = ['highlight', language, md5(code)].join(':');
		const highlight = this.state.highlights[key];

		if (highlight) {
			return highlight;
		}

		this.jobs[key] = {code, language};
		return code;
	}

	render() {
		return (
			<div className="markdown">
				<Remarkable
					container="div"
					source={emojify(this.props.source)}
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

export default Markdown;
