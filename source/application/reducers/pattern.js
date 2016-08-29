import {handleAction} from 'redux-actions';

import {getPatternData, getPatternFile, reloadPatternStart} from '../actions';
import {handlePromiseThunkAction} from '../actions/promise-thunk-action';

import composeReducers from '../utils/compose-reducers';

const handlePatternNavigation = handleAction('@@router/LOCATION_CHANGE', state => {
	return state;
}, {});

const handlePatternLoad = handlePromiseThunkAction(getPatternData, {
	start(state) {
		return {
			sources: state.sources
		};
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
			sources
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

const handlePatternReload = handleAction(reloadPatternStart, state => {
	return {
		...state,
		reloading: true,
		reloadedTime: 0,
		reloadTime: Date.now()
	};
});

const handlePatternReloadSuccess = handleAction('RELOAD_PATTERN_SUCCESS', state => {
	return {
		...state,
		reloading: false,
		reloadedTime: Date.now()
	};
});

export default composeReducers(
	handlePatternNavigation,
	handlePatternLoad,
	handleSourceLoad,
	handlePatternReload,
	handlePatternReloadSuccess
);
