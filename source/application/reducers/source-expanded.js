import {handleActions} from 'redux-actions';

const defaultValue = false;

const locationChangeHandler = (_, {payload}) => {
	return payload.query['source-expanded'] === 'true';
};

export default handleActions({
	'@@router/LOCATION_CHANGE': locationChangeHandler
}, defaultValue);
