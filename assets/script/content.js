function getHeight () {
	const measurementElements = [document.documentElement, document.body];
	const measurementMethods = ['scrollHeight', 'offsetHeight', 'clientHeight'];

	let measurements = [];

	for (let element of measurementElements) {
		for (let method of measurementMethods) {
			measurements.push(element[method]);
		}
	}

	return Math.max(...measurements);
}

function send () {
	window.parent.postMessage({'type': 'rubberband', 'height': getHeight(), 'id': window.frameElement.id}, '*');
}

function onMessage (e) {
	console.log(e);

	if (e.data.type !== 'rubberband') {
		return;
	}

	if (e.data.id !== window.frameElement.id) {
		return;
	}

	send();
}

function start () {
	if (!('frameElement' in window)) {
		return;
	}

	if (!('parent' in window)) {
		return;
	}

	if (!('postMessage' in window.parent)) {
		return;
	}

	window.addEventListener('load', send);
	window.addEventListener('resize', send);
	window.addEventListener('message', onMessage);
}

start();
