import url from 'url';
import loadSchema from './load-schema';

export default listen;

function listen() {
	return async (dispatch, getState) => {
		const state = getState();
		const uri = url.resolve(state.base, 'api');
		const source = new global.EventSource(uri);

		source.addEventListener('change', event => {
			const payload = JSON.parse(event.data);
			const file = payload.file || '';

			if (file.startsWith('patterns')) {
				dispatch(loadSchema(state.base));
			}
		});
	};
}
