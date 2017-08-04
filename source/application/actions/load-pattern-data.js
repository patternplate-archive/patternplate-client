import {merge} from 'lodash';
import {createPromiseThunkAction} from './promise-thunk-action';
import fetch from '../utils/fetch';
import urlQuery from '../utils/url-query';

async function getError(response) {
	try {
		const json = await response.json();
		const error = new Error(json.message);
		return merge(error, json);
	} catch (error) {
		error.message = [
			`Request for ${response.uri} failed with code ${response.status}: ${response.statusText}`,
			error.message
		].join('\n');
		return error;
	}
}

export default createPromiseThunkAction('LOAD_PATTERN_DATA', async (_, __, getState) => {
	const state = getState();

	if (!state.pattern.id) {
		return state.pattern;
	}

	const uri = urlQuery.format({
		pathname: `${state.base}api/pattern/${state.id}.json`,
		query: {environment: state.environment}
	});

	const response = await fetch(uri);

	if (response.status >= 400) {
		throw await getError(response);
	}

	return response.json();
});
