import {createAction} from 'redux-actions';
import highlight from '../utils/highlight';

export default createAction('HIGHLIGHT_CODE', thunk);

async function thunk(options) {
	try {
		return await highlight(options);
	} catch (error) {
		error.options = options;
		throw error;
	}
}
