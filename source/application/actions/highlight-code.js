import ARSON from 'arson';
import {createAction} from 'redux-actions';
import {memoize} from 'lodash';

const startWorker = memoize(url => {
	const {Worker} = global;
	return new Worker(url);
});

export default createAction('HIGHLIGHT_CODE', options => {
	return new Promise((resolve, reject) => {
		const worker = startWorker(options.worker);

		const onWorkerMessage = e => {
			const data = ARSON.parse(e.data);
			if (data.id === options.id) {
				resolve(data);
				unbind();
			}
		};

		const onWorkerError = error => {
			reject(error);
			unbind();
		};

		function unbind() {
			worker.removeEventListener('message', onWorkerMessage);
			worker.removeEventListener('error', onWorkerError);
		}

		worker.addEventListener('message', onWorkerMessage);
		worker.addEventListener('error', onWorkerError);
		worker.postMessage(ARSON.stringify(options));
	});
});
