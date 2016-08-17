import {getPatternData} from '../actions';
import {handlePromiseThunkAction} from '../actions/promise-thunk-action';

const ident = (state = {}) => state;

export default {
	schema: ident,
	navigation: ident,
	patterns: handlePromiseThunkAction(getPatternData, {
		start(state, {payload}) {
			return {...state, loading: payload.options.loading};
		},
		success(state, {payload}) {
			const {id, manifest, results, dependencies, environments} = payload;
			return {id, manifest, results, dependencies, environments, loading: false};
		}
	}, []),
	messages: handlePromiseThunkAction(getPatternData, {
		throws(state, action) {
			return state;
		}
	}, {}),
	config: ident,
	base: ident,
	depth: ident
};
