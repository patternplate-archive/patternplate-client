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

function createMessage(payload, seed = 1) {
	const lines = payload.message.split('\n');
	return {
		type: 'error',
		id: md5([Date.now(), seed, ...lines].join('-')),
		subject: lines[0],
		body: strip(lines.slice(1, lines.length).join('\n')),
		stack: strip(payload.stack),
		pattern: payload.pattern,
		file: payload.file
	};
}

export default {
	schema: ident,
	navigation: ident,
	patterns: handlePromiseThunkAction(getPatternData, {
		start(state, {payload}) {
			const loading = payload.options.loading;
			const amend = loading ? {} : state;

			return {
				...amend,
				loading
			};
		},
		success(state, {payload}) {
			const {id, manifest, results, dependencies, environments} = payload;
			return {id, manifest, results, dependencies, environments, loading: false};
		},
		throws() {
			return {loading: false};
		}
	}, []),
	messages: compose(
		handlePromiseThunkAction(getPatternData, {
			success() {
				return [];
			},
			throws(state, {payload}) {
				const message = createMessage(payload);
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
