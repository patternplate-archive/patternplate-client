import {loadSchema} from '../actions';
import {handlePromiseThunkAction} from '../actions/promise-thunk-action';

export default handlePromiseThunkAction(loadSchema, {
	success(state, {payload}) {
		return payload.meta;
	}
}, {});
