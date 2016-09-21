import {handleActions} from 'redux-actions';
import urlQuery from '../utils/url-query';

const defaultValue = 'index';

function getEnvironment(pathname) {
	return urlQuery.parse(pathname).query.environment || defaultValue;
}

function onEnvironmentLocationChange(_, action) {
	return getEnvironment(action.payload.pathname);
}

export default handleActions({
	'@@router/LOCATION_CHANGE': onEnvironmentLocationChange
}, defaultValue);
