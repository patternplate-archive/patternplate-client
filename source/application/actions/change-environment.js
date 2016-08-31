import {patchLocation} from './';
import urlQuery from '../utils/url-query';

export default changeEnvironment;
export const type = 'CHANGE_ENVIRONMENT';

function changeEnvironment(environment) {
	return (dispatch, getState) => {
		const location = getState().routing.locationBeforeTransitions;
		const parsed = urlQuery.parse(location.pathname);
		const pathname = urlQuery.format({
			...parsed,
			query: {
				environment
			}
		});

		dispatch(patchLocation({pathname}));
	};
}

changeEnvironment.type = type;
