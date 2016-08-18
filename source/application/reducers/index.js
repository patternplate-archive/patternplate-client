import path from 'path';
import strip from 'strip-ansi';
import md5 from 'md5';

import {handleAction} from 'redux-actions';
import {updateTime, getPatternData, dismissMessage} from '../actions';
import {handlePromiseThunkAction} from '../actions/promise-thunk-action';

const ident = (state = {}) => state;

function compose(...args) {
	return (state, action) => {
		return args.reduce((state, arg) => arg(state, action), state);
	};
}

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

export default {
	schema: ident,
	navigation: ident,
	patterns: handlePromiseThunkAction(getPatternData, {
		start(state, {payload}) {
			const loading = payload.options.loading;
			const reloading = payload.options.reloading;
			const amend = loading ? {} : state;

			return {
				...amend,
				loading,
				reloading
			};
		},
		success(state, {payload}) {
			const {id, manifest, results, dependencies, environments} = payload;
			return {
				id, manifest, results, dependencies, environments, loading: false,
				reloading: false
			};
		},
		throws() {
			return {loading: false, reloading: false};
		}
	}, []),
	messages: compose(
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
	),
	config: ident,
	base: ident,
	depth: ident,
	time: handleAction(updateTime, {
		next: state => {
			const now = Date.now();
			return now - state > 1000 ? now : state;
		}
	}, Date.now())
};
