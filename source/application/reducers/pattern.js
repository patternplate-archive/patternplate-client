import path from 'path';
import {merge} from 'lodash';
import {handleAction} from 'redux-actions';
import {loadPatternData, loadPatternFile, loadPatternDemo, loadSchema} from '../actions';

import {handlePromiseThunkAction} from '../actions/promise-thunk-action';
import composeReducers from '../utils/compose-reducers';

const handlePatternLoad = handlePromiseThunkAction(loadPatternData, {
	start(state) {
		return {
			errors: state.errors,
			dataErrored: false,
			demoErrored: false,
			sourceErrored: false,
			dataLoading: true,
			demoLoading: Boolean(state.id),
			fileLoading: Boolean(state.sourceId),
			reloadTime: state.reloadTime,
			reloadedTime: state.reloadedTime,
			sources: state.sources
		};
	},
	success(state, {payload}, {id}) {
		const sources = state ? state.sources : {};
		const errors = state ? state.errors || [] : [];

		if (id !== payload.id) {
			return state;
		}

		return {
			...state,
			id: payload.id,
			dependencies: payload.dependencies,
			dependents: payload.dependents,
			environments: payload.environments,
			dataErrored: false,
			dataLoading: false,
			files: payload.files,
			manifest: payload.manifest,
			sources,
			errors
		};
	},
	throws(state, {payload}) {
		return {
			dataLoading: false,
			errors: [...(state.errors || []), {file: null, id: state.id, payload}],
			dataErrored: true
		};
	}
}, {
	defaultValue: {},
	dependencies: ['id']
});

const handleSourceLoad = handlePromiseThunkAction(loadPatternFile, {
	start(state) {
		return {
			...state,
			sourceLoading: true,
			sourceErrored: false
		};
	},
	success(state, {payload}) {
		return {
			...state,
			sourceLoading: false,
			sourceErrored: false,
			sources: {
				...state.sources,
				[payload.id]: payload.source
			}
		};
	},
	throws(state, {payload: error}) {
		return {
			...state,
			sourceLoading: false,
			sourceErrored: true,
			errors: [...state.errors, {id: state.id, payload: error.payload}]
		};
	}
});

const handleLoadPatternDemo = handleAction(loadPatternDemo, (state, {payload: loading}) => {
	return {
		...state,
		demoErrored: false,
		demoLoading: loading,
		reloadTime: loading ? Date.now() : state.reloadTime
	};
});

const handleLoadSchema = handlePromiseThunkAction(loadSchema, {
	success(state, action) {
		const match = find(action.payload.meta, state.id);
		if (match) {
			return merge({}, state, match);
		}
	}
});

const reducers = composeReducers(
	handlePatternLoad,
	handleSourceLoad,
	handleLoadPatternDemo,
	handleLoadSchema
);

export default reducers;

function find(tree, id, depth = 1) {
	const frags = id.split('/').filter(Boolean);
	const sub = frags.slice(0, depth).map(strip);
	const match = tree.children.find(child => child.path.every((s, i) => sub[i] === strip(s)));

	if (depth < frags.length) {
		return find(match, id, depth + 1);
	}

	return match;
}

function strip(b) {
	return path.basename(b, path.extname(b));
}
