import {handleAction} from 'redux-actions';

import {getPatternData, getPatternFile} from '../actions';
import {handlePromiseThunkAction} from '../actions/promise-thunk-action';

import getIdByPathname from '../utils/get-id-by-pathname';
import composeReducers from '../utils/compose-reducers';

const handlePatternNavigation = handleAction('@@router/LOCATION_CHANGE', (state, action) => {
	// const id = getIdByPathname(action.payload.pathname);
	// const stateId = state ? state.id : null;
	return state;
}, {});

const handlePatternLoad = handlePromiseThunkAction(getPatternData, {
	start(state) {
		return state;
	},
	success(state, {payload}) {
		const sources = state ? state.sources : {};
		return {
			...state,
			dependencies: payload.dependencies,
			environments: payload.environments,
			files: payload.files,
			id: payload.id,
			loading: false,
			manifest: payload.manifest,
			reloading: false,
			sources: payload.sources || sources
		};
	},
	throws() {
		return {loading: false, reloading: false};
	}
}, {});

const handleSourceLoad = handlePromiseThunkAction(getPatternFile, {
	success(state, {payload}) {
		return {
			...state,
			sources: {
				...state.sources,
				[payload.id]: payload.source
			}
		};
	}
});

export default composeReducers(
	handlePatternNavigation,
	handlePatternLoad,
	handleSourceLoad
);
