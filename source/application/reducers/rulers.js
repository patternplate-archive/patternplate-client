import {handleActions} from 'redux-actions';

const defaultValue = false;

function onRulersLocationChange(_, action) {
	return action.payload.query.rulers === 'true';
}

export default handleActions({
	'@@router/LOCATION_CHANGE': onRulersLocationChange
}, defaultValue);
