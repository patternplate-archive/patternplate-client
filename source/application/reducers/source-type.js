import {handleAction} from 'redux-actions';
import urlQuery from '../utils/url-query';

const defaultValue = 'source';

function handler(state, {payload}) {
	if (!payload.query.source) {
		return state;
	}

	const parsed = urlQuery.parse(payload.query.source || '');
	return parsed.query.type || defaultValue;
}

export default handleAction('@@router/LOCATION_CHANGE', handler, defaultValue);
