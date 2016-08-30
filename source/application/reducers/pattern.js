import {handleAction} from 'redux-actions';

import {getPatternData, getPatternFile, reloadPatternStart} from '../actions';
import {handlePromiseThunkAction} from '../actions/promise-thunk-action';

import composeReducers from '../utils/compose-reducers';

const handlePatternLoad = handlePromiseThunkAction(getPatternData, {
	start(state) {
		return {
			loading: true,
			sources: state.sources,
			errors: state.errors
		};
	},
	success(state, {payload}) {
		const sources = state ? state.sources : {};
		const errors = state ? state.errors || [] : [];
		return {
			...state,
			dependencies: payload.dependencies,
			environments: payload.environments,
			files: payload.files,
			id: payload.id,
			loading: false,
			manifest: payload.manifest,
			reloading: false,
			sources,
			errors
		};
	},
	throws(state, {payload}) {
		return {
			loading: false,
			reloading: false,
			errors: [...state.errors, {file: null, id: state.id, payload}]
		};
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
	},
	throws(state, {payload: error}) {
		return {
			...state,
			errors: [...state.errors, {id: state.id, payload: error.payload}]
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

const reducers = composeReducers(
	handlePatternLoad,
	handleSourceLoad,
	handlePatternReload,
	handlePatternReloadSuccess
);

export default reducers;
