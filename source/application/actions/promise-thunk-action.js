import {createAction, handleActions} from 'redux-actions';

const ident = i => i;
const asyncIdent = async i => i;

export function createPromiseThunkAction(name, rawCreator) {
	const creator = rawCreator || asyncIdent;
	const fn = payload => {
		return async dispatch => {
			dispatch(createAction(`${name}_START`)(payload));
			const delayedTimer = global.setTimeout(() => {
				dispatch(createAction(`${name}_DELAYED`)(payload));
			}, 300);
			try {
				const result = await creator(payload);
				global.clearTimeout(delayedTimer);
				dispatch(createAction(`${name}_SUCCESS`)(result));
			} catch (error) {
				global.clearTimeout(delayedTimer);
				dispatch(createAction(`${name}_THROW`)(error));
			}
		};
	};
	fn.__name = name;
	return fn;
}

export function handlePromiseThunkAction(rawName, handler, defaults) {
	const name = rawName.__name || rawName;
	const reducer = handleActions({
		[`${name}_START`]: handler.start || ident,
		[`${name}_DELAYED`]: handler.delayed || ident,
		[`${name}_SUCCESS`]: handler.success || ident,
		[`${name}_THROW`]: handler.throw || ident
	}, defaults);
	return reducer;
}
