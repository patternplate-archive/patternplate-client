import {findDOMNode} from 'react-dom';
import {debounce, omit} from 'lodash';

export default bind;

function bind(ref, props) {
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

	const onScroll = debounce(e => {
		const scrolling = e.target.scrollingElement;
		const y = scrolling.scrollTop;
		const x = scrolling.scrollLeft;
		props.onScroll({x, y});
	}, 15);

	win.addEventListener('scroll', onScroll);
}
