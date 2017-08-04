import {patchLocation} from './';

export default search;
export const type = 'SEARCH';

function search(payload) {
	return dispatch => {
		if (payload.persist) {
			dispatch(patchLocation({
				query: {search: payload.value}
			}));
		} else {
			dispatch({
				type: 'PERFORM_SEARCH',
				payload: payload.value
			});
		}
	};
}

search.type = type;
