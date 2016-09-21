import handleDependentActions from '../actions/handle-dependent-actions';
import urlQuery from '../utils/url-query';

const defaultValue = null;

function handler(_, {payload}, {environment}) {
	if (payload.query.source) {
		const parsed = urlQuery.parse(payload.query.source);
		return urlQuery.format({
			...parsed,
			query: {
				...parsed.query,
				environment
			}
		});
	}
	return defaultValue;
}

export default handleDependentActions({
	'@@router/LOCATION_CHANGE': handler
}, {
	dependencies: ['environment']
});
