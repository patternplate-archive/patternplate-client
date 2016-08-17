import 'isomorphic-fetch';
import {merge} from 'lodash';
import {createAction} from 'redux-actions';

import {createPromiseThunkAction} from './promise-thunk-action';
import urlQuery from '../utils/url-query';

const headers = {headers: {accept: 'application/json'}, credentials: 'include'};

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

export const getPatternData = createPromiseThunkAction('GET_PATTERN_DATA', async payload => {
	const {id, query} = payload;
	const uri = urlQuery.format({
		pathname: `/api/pattern/${id}.json`, query
	});

	const response = await global.fetch(uri, headers);

	if (response.status >= 400) {
		throw await getError(response);
	}

	return response.json();
});

export const getTime = createAction('GET_TIME');

export const dismissMessage = createAction('DISMISS_MESSAGE');
