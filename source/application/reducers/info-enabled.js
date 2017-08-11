import {handleActions} from 'redux-actions';

const defaultValue = false;

function onInfoEnabledLocationChange(_, action) {
	return action.payload.query['info-enabled'] === 'true';
}

export default handleActions({
	'@@router/LOCATION_CHANGE': onInfoEnabledLocationChange
}, defaultValue);
