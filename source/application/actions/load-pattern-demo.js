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
				payload: {id: uri, error: await response.text()}
			});
		}

		const contents = await response.text();

		dispatch({
			type: 'LOAD_PATTERN_DEMO_SUCCESS',
			payload: {id: uri, contents}
		});
	};
};
