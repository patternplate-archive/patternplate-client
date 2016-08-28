import {handleAction} from 'redux-actions';
import highlightCode from '../actions/highlight-code';

export default handleAction(highlightCode, {
	next(state, {payload}) {
		if (payload.highlighted) {
			const {id, payload: content} = payload;

			return {
				...state,
				[id]: content
			};
		}
		return state;
	}
}, {});
