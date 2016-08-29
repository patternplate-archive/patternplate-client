import {handleAction} from 'redux-actions';

const defaultValue = 'source';

function handler(_, action) {
	return action.payload.query['source-type'] || defaultValue;
}

export default handleAction('@@router/LOCATION_CHANGE', handler, defaultValue);
