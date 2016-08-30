import {createStore, compose, applyMiddleware} from 'redux';
import {routerReducer as routing, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import topology from 'topologically-combine-reducers';
import promise from 'redux-promise';

import reducers, {dependencies} from '../reducers';

const reduxLogger = require.main ?
	require('redux-cli-logger').default :
	require('redux-logger');

function logger() {
	if (process.env.NODE_ENV === 'production') {
		return null;
	}

	return reduxLogger({});
}

export default function configureStore(history, initial) {
	const reducer = hydrateable(topology({routing, ...reducers}, dependencies));

	const middlewares = process.env.NODE_ENV === 'production' ?
		[thunk, promise, routerMiddleware(history)] :
		[thunk, promise, logger(), routerMiddleware(history)];

	const middleware = applyMiddleware(...middlewares);
	const store = createStore(reducer, initial, compose(middleware));

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
