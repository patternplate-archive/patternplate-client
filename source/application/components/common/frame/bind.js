import {findDOMNode} from 'react-dom';
import {omit} from 'lodash';

export default bind;

function bind(ref) {
	if (!ref) {
		return;
	}

	const {KeyboardEvent, window} = global;
	const node = findDOMNode(ref);
	const win = node.contentWindow;

	win.addEventListener('keydown', e => {
		const event = new KeyboardEvent('keydown', omit(e, ['keyLocation']));
		event.data = e;
		if (e.keyCode === 82) {
			node.blur();
		}
		window.dispatchEvent(event);
	});
}
