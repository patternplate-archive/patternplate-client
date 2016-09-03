import {handlePromiseThunkAction} from '../actions/promise-thunk-action';
import highlightCode from '../actions/highlight-code';

const defaultValue = {
	queue: [],
	results: [],
	errors: []
};

export default handlePromiseThunkAction(highlightCode, {
	start: handleStart,
	success: handleSuccess,
	throws: handleError,
	delayed: handleError
}, {defaultValue});

function handleStart(state, {payload}) {
	const result = state.results.find(result => result.id === payload.id);
	const queued = state.queue.find(item => item.id === payload.id);
	const errored = state.errors.find(error => error.id === payload.id);

	if (result || queued || errored) {
		return state;
	}

	return {
		...state,
		queue: [...state.queue, payload]
	};
}

function handleSuccess(state, {payload}) {
	return {
		queue: state.queue.filter(result => result.id !== payload.id),
		results: [...state.results, payload],
		errors: state.errors.filter(result => result.id !== payload.id)
	};
}

function handleError(state, {payload: error}) {
	const payload = error.payload || error;

	return {
		queue: state.queue.filter(item => item.id !== payload.id),
		results: state.results.filter(result => result.id !== payload.id),
		errors: [...state.errors, payload]
	};
}
