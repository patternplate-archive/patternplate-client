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
	const doc = win.document;

	win.addEventListener('keydown', e => {
		const event = new KeyboardEvent('keydown', omit(e, ['keyLocation']));
		event.data = e;
		if (e.keyCode === 82) {
			node.blur();
		}
		window.dispatchEvent(event);
	});

	props.onResize({
		width: doc.body.clientWidth,
		height: doc.body.clientHeight
	});

	const onResize = debounce(() => {
		props.onResize({
			width: doc.body.scrollWidth,
			height: doc.body.scrollHeight
		});
	}, 15);

	const onScroll = debounce(() => {
		const scroller = doc.scrollingElement || doc.body;
		const y = scroller.scrollTop;
		const x = scroller.scrollLeft;
		props.onScroll({x, y});
	}, 15);

	win.addEventListener('resize', onResize);
	win.addEventListener('scroll', onScroll);
}
