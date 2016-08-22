import {handleAction} from 'redux-actions';
import highlightCode from '../actions/highlight-code';

export default handleAction(highlightCode, {
	next(state, {payload: {id, payload}}) {
		return {
			...state,
			[id]: payload
		};
	}
}, {});
