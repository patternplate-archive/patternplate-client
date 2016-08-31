import {patchLocation} from './';

export default search;
export const type = 'SEARCH';

function search(search) {
	return dispatch => {
		dispatch(patchLocation({
			query: {
				search
			}
		}));
	};
}

search.type = type;
