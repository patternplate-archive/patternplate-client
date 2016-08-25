import {handleActions} from 'redux-actions';

const defaultValue = true;

function onExpandedLocationChange(_, action) {
	return action.payload.query.expanded !== 'false';
}

export default handleActions({
	'@@router/LOCATION_CHANGE': onExpandedLocationChange
}, defaultValue);
