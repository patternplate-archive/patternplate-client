import path from 'path';
import urlQuery from '../utils/url-query';
import {patchLocation} from './';

export default changeConcern;
export const type = 'CHANGE_CONCERN';

function changeConcern(concern) {
	return (dispatch, getState) => {
		const location = getState().routing.locationBeforeTransitions;
		const parsed = urlQuery.parse(location.query.source);
		const previous = parsed.pathname;
		const source = urlQuery.format({
			pathname: `${path.dirname(previous)}/${concern}${path.extname(previous)}`,
			query: parsed.query
		});

		dispatch(patchLocation({
			query: {
				source
			}
		}));
	};
}

changeConcern.type = type;
