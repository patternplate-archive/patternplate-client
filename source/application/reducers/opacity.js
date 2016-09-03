import {handleActions} from 'redux-actions';

const defaultValue = true;

function onOpacityLocationChange(_, action) {
	return action.payload.query.opacity !== 'false';
}

export default handleActions({
	'@@router/LOCATION_CHANGE': onOpacityLocationChange
}, defaultValue);
