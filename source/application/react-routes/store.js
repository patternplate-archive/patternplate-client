import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {routerReducer as routing, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import reducers from '../reducers';

const logger = process.env.NODE_ENV === 'production' ?
	null :
	require('redux-logger');

export default function configureStore(history, initial) {
	const reducer = combineReducers({routing, ...reducers});

	const middlewares = process.env.NODE_ENV === 'production' ?
		[thunk, promise, routerMiddleware(history)] :
		[thunk, promise, logger(), routerMiddleware(history)];

	const middleware = applyMiddleware(...middlewares);
	return createStore(reducer, initial, compose(middleware));
}
