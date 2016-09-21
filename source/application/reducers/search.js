import {handleActions} from 'redux-actions';

const defaultValue = '';

function onSearchLocationChange(_, action) {
	return action.payload.query.search;
}

export default handleActions({
	'@@router/LOCATION_CHANGE': onSearchLocationChange
}, defaultValue);
