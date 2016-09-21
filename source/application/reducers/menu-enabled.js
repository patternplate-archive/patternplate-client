import {handleActions} from 'redux-actions';

const defaultValue = false;

const menuEnabledlocationChangeHandler = (_, {payload}) => {
	return payload.query['menu-enabled'] === 'true';
};

export default handleActions({
	'@@router/LOCATION_CHANGE': menuEnabledlocationChangeHandler
}, defaultValue);
