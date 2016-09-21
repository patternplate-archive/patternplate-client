import {createStore, compose, applyMiddleware} from 'redux';
import {routerReducer as routing, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import topology from 'topologically-combine-reducers';
import promise from 'redux-promise';
// import logger from 'redux-logger';

import reducers, {dependencies} from '../reducers';

export default function configureStore(history, initial) {
	const reducer = hydrateable(topology({routing, ...reducers}, dependencies));

	const middlewares = [thunk, promise, /* logger(),*/ routerMiddleware(history)];

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
