import {handleAction} from 'redux-actions';
import {omit, uniq} from 'lodash';
import highlightCode from '../actions/highlight-code';

export default handleAction(highlightCode, {
	next(state, {payload}) {
		if (payload.highlighted) {
			const {id, payload: content} = payload;

			return {
				...state,
				[id]: content,
				errors: (state.errors || []).filter(err => err !== id)
			};
		}

		return state;
	},
	throw(state, {payload: error}) {
		if (error.options && error.options.id) {
			return {
				...omit(state, [error.options.id]),
				errors: uniq([...(state.errors || []), error.options.id])
			};
		}
		return state;
	}
}, {});
