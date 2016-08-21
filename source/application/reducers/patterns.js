import {getPatternData} from '../actions';
import {handlePromiseThunkAction} from '../actions/promise-thunk-action';

export default handlePromiseThunkAction(getPatternData, {
	start(state, {payload}) {
		const loading = payload.options.loading;
		const reloading = payload.options.reloading;
		const amend = loading ? {} : state;

		return {
			...amend,
			loading,
			reloading
		};
	},
	success(state, {payload}) {
		const {id, manifest, results, dependencies, environments} = payload;
		return {
			id, manifest, results, dependencies, environments, loading: false,
			reloading: false
		};
	},
	throws() {
		return {loading: false, reloading: false};
	}
}, []);
