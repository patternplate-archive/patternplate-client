import {handleActions} from 'redux-actions';

const defaultValue = true;

function onHideChange(_, action) {
	return action.payload.query.hide !== 'false';
}

export default handleActions({
	'@@router/LOCATION_CHANGE': onHideChange
}, defaultValue);
