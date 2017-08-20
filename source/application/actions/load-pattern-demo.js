import {merge} from 'lodash';
import fetch from 'isomorphic-fetch';
import * as demo from '../selectors/demo';

export default () => {
	return async (dispatch, getState) => {
		const state = getState();
		const uri = demo.selectSrc(state);

		if (!uri) {
			return;
		}

		dispatch({
			type: 'LOAD_PATTERN_DEMO_START',
			payload: {id: uri}
		});

		const response = await fetch(uri, {
			headers: {Accept: 'text/html'}
		});

		if (response.status >= 400) {
			return dispatch({
				type: 'LOAD_PATTERN_DEMO_ERROR',
				payload: {id: uri, error: await getError(response)}
			});
		}

		const contents = await response.text();

		dispatch({
			type: 'LOAD_PATTERN_DEMO_SUCCESS',
			payload: {id: uri, contents}
		});
	};
};

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
