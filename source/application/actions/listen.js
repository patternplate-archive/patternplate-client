import url from 'url';
import {createPromiseThunkAction} from './promise-thunk-action';
import loadSchema from './load-schema';

export default createPromiseThunkAction('LISTEN', (_, dispatch, getState) => {
	const state = getState();
	const uri = url.resolve(state.base, 'api');
	const source = new global.EventSource(uri);

	source.addEventListener('error', event => {
		dispatch({
			type: 'ERROR_HEARTBEAT',
			payload: JSON.parse(event.data)
		});
	});

	source.addEventListener('heartbeat', async event => {
		dispatch({
			type: 'LISTEN_HEARTBEAT',
			payload: JSON.parse(event.data)
		});
	});

	source.addEventListener('change', async event => {
		const payload = JSON.parse(event.data);
		const file = payload.file || '';

		if (file.startsWith('patterns')) {
			dispatch(await loadSchema(state.base));
		}
	});
});
