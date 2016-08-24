import {handleAction} from 'redux-actions';

const defaultValue = null;

function handler(_, action) {
	return action.payload.query.source || defaultValue;
}

export default handleAction('@@router/LOCATION_CHANGE', handler, defaultValue);
