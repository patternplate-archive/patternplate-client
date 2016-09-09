import React, {PropTypes as t} from 'react';
import {requestIdleCallback, cancelIdleCallback} from 'request-idle-callback';

export default class Code extends Component {
	render() {
		const {props} = this;
		const className = join('code hljs', `hljs-${props.format}`);

		return (
			<code className={className}>
				{source}
			</code>
		);
	}
}

Code.propTypes = {
	source: t.string.isRequired,
	format: t.string
};

function highlightIfNeeded(props) {
	if (!props.source) {
		return;
	}
	if (!props.format) {
		return;
	}

	const waits = ['errors', 'queue']
		.some(key => props.highlights[key].find(item => item.id === props.id));

	if (waits) {
		return;
	}

	const result = props.highlights.results.find(item => item.id === props.id);

	if (result) {
		return;
	}

	const worker = `${props.base}script/lowlight.bundle.js`;
	const options = {id: props.id, payload: props.source, worker, language: props.format};
	props.onHighlightRequest(options);
}
