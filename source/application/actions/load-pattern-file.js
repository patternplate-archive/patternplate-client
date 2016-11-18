import {merge} from 'lodash';
import {createPromiseThunkAction} from './promise-thunk-action';
import fetch from '../utils/fetch';

async function getError(response, payload) {
	try {
		const json = await response.json();
		const error = new Error(json.message);
		error.payload = payload;
		return merge(error, json);
	} catch (error) {
		error.message = [
			`Request for ${response.uri} failed with code ${response.status}: ${response.statusText}`,
			error.message
		].join('\n');
		error.payload = payload;
		return error;
	}
}

export default createPromiseThunkAction('LOAD_PATTERN_FILE', async payload => {
	const {id, base} = payload;
	const uri = `${base}api/file/${id}`;
	const response = await fetch(uri);

	if (response.status >= 400) {
		const error = await getError(response, payload);
		throw error;
	}

	const source = await response.text();

	return {
		id,
		source
	};
});
