import {handleActions} from 'redux-actions';

const defaultValue = 'light';

const locationChangeHandler = (_, {payload}) => {
	return payload.query.theme;
};

export default handleActions({
	'@@router/LOCATION_CHANGE': locationChangeHandler
}, defaultValue);
