import * as actions from '../actions';
import {handlePromiseThunkAction} from '../actions/promise-thunk-action';

export default handlePromiseThunkAction(actions.loadPatternFile, {
	start(state = {}, {payload}) {
		if (state[payload.id]) {
			return state;
		}
		return {
			...state,
			[payload.id]: payload
		};
	},
	success(state = {}, {payload}) {
		return {
			...state,
			[payload.id]: {
				...state[payload.id],
				source: payload.source
			}
		};
	},
	error(state = {}) {
		return state;
	}
});
