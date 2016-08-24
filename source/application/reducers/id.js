import getIdByPathname from '../utils/get-id-by-pathname';
import {handleAction} from 'redux-actions';

const defaultValue = null;

function handler(_, action) {
	return getIdByPathname(action.payload.pathname) || null;
}

export default handleAction('@@router/LOCATION_CHANGE', handler, defaultValue);
