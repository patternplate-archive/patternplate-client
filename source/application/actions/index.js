import 'isomorphic-fetch';
import {merge} from 'lodash';

import {createPromiseThunkAction} from './promise-thunk-action';
import urlQuery from '../utils/url-query';

const headers = {headers: {accept: 'application/json'}, credentials: 'include'};

export const getPatternData = createPromiseThunkAction('GET_PATTERN_DATA', async payload => {
	const {id, query} = payload;
	const uri = urlQuery.format({
		pathname: `/api/pattern/${id}.json`, query
	});

	const response = await global.fetch(uri, headers);

	if (response.status >= 400) {
		try {
			const jsonError = await response.json();
			const dataError = new Error(jsonError.message);
			merge(dataError, jsonError);
			throw dataError;
		} catch (error) {
			throw new Error(`Request for ${uri} failed with code ${response.status}: ${response.statusText}`);
		}
	}

	return response.json();
});
