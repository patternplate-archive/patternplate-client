import {handleActions} from 'redux-actions';

const defaultValue = false;

const navigationEnabledlocationChangeHandler = (_, {payload}) => {
	return payload.query['manifest-enabled'] === 'true';
};

export default handleActions({
	'@@router/LOCATION_CHANGE': navigationEnabledlocationChangeHandler
}, defaultValue);
