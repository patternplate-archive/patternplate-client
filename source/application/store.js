import {createStore, compose, applyMiddleware} from 'redux';
import {routerReducer as routing, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import topology from 'topologically-combine-reducers';
import promise from 'redux-promise';

import createShortcuts from './shortcuts';
import reducers, {dependencies} from './reducers';

export default function configureStore(history, initial) {
	const reducer = hydrateable(topology({routing, ...reducers}, dependencies));
	const enhance = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const middlewares = [
		thunk,
		promise,
		routerMiddleware(history)
	].filter(fn => typeof fn === 'function');

	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(require('redux-freeze'));
	}

	const middleware = applyMiddleware(...middlewares);
	const shortcuts = createShortcuts();
	const store = createStore(reducer, {...initial, shortcuts}, enhance(middleware));

	shortcuts(store);

	return store;
}

function hydrateable(reducer) {
	return (state, action) => {
		switch (action.type) {
			case '@@APPLY_STATE':
				return reducer(action.payload, action);
			default:
				return reducer(state, action);
		}
	};
}
