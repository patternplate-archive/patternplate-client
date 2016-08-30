import {handleActions} from 'redux-actions';

const defaultValue = false;

function onIssueLocationChange(_, action) {
	return action.payload.query.issue === 'true';
}

export default handleActions({
	'@@router/LOCATION_CHANGE': onIssueLocationChange
}, defaultValue);
