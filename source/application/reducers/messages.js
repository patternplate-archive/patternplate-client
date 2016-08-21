import path from 'path';
import strip from 'strip-ansi';
import md5 from 'md5';
import {handleAction} from 'redux-actions';

import {getPatternData, dismissMessage} from '../actions';
import {handlePromiseThunkAction} from '../actions/promise-thunk-action';

function createMessage(error, seed = 1) {
	error.cwd = '/Users/marneb/projects/patternplate/patternplate/patterns/';
	const lines = error.message.split('\n');
	return {
		type: 'error',
		id: md5([Date.now(), seed, ...lines].join('-')),
		subject: lines[0],
		body: strip(lines.slice(1, lines.length).join('\n')),
		stack: strip(error.stack),
		pattern: error.pattern,
		payload: error.payload,
		retry: error.pattern && error.payload,
		file: error.cwd && error.file ? path.relative(error.cwd, error.file).slice(-25) : null
	};
}

function compose(...args) {
	return (state, action) => {
		return args.reduce((state, arg) => arg(state, action), state);
	};
}

export default compose(
	handlePromiseThunkAction(getPatternData, {
		/* start() {
			return [];
		}, */
		success() {
			return [];
		},
		throws(state, {payload: error}) {
			const message = createMessage(error);
			return [message, ...state.slice(0, 2)];
		}
	}, []),
	handleAction(dismissMessage, (state, {payload: id}) => {
		return state.filter(message => message.id !== id);
	}, [])
);
