import React, {Component, PropTypes as types} from 'react';
import {memoize, noop} from 'lodash';
import pure from 'pure-render-decorator';

function getField(name) {
	return lines => {
		const lookup = `${name}: `;
		const line = lines.find(line => line.startsWith(lookup));
		return line.slice(lookup.length - 1);
	};
}

function getError(lines) {
	const pattern = getField('Pattern')(lines);
	const transform = getField('Transform')(lines);
	const file = getField('File')(lines);

	const error = new Error(lines.join('\n'));
	error.pattern = pattern;
	error.transform = transform;
	error.fileName = file;
	return error;
}

const relay = memoize((onLoad = noop, onError = noop) => {
	return e => {
		const document = e.target.contentWindow.document;
		const {body} = document;
		const first = body.firstChild;
		const lines = first.innerText.split('\n');

		if (lines[0].startsWith('Message: Error in')) {
			const error = getError(lines);
			return onError(error);
		}
	};
});

@pure
class Frame extends Component {
	static displayName = 'Frame';

	static propTypes = {
		src: types.string.isRequired,
		id: types.string.isRequired
	};

	render() {
		const {props} = this;

		return (
			<iframe
				className={props.className}
				onLoad={relay(props.onLoad, props.onError)}
				src={props.src}
				sandbox={props.sandbox}
				/>
		);
	}
}

export default Frame;
