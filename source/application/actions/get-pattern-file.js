import 'isomorphic-fetch';
import {merge} from 'lodash';
import {createPromiseThunkAction} from './promise-thunk-action';
import urlQuery from '../utils/url-query';

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

export default createPromiseThunkAction('GET_PATTERN_FILE', async payload => {
	const {id, environment, type, base} = payload;
	const uri = urlQuery.format({
		pathname: `${base}api/file/${id}`,
		query: {environment, type}
	});

	const response = await global.fetch(uri);

	if (response.status >= 400) {
		throw await getError(response, payload);
	}

	const source = await response.text();

	return {
		id,
		source
	};
});
