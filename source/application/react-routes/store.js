import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {routerReducer as routing, routerMiddleware} from 'react-router-redux';
import logger from 'redux-logger';

import reducers from '../reducers';

export default function configureStore(history, initial) {
	const reducer = combineReducers({routing, ...reducers});
	const middleware = applyMiddleware(logger(), routerMiddleware(history));
	// const loggerMiddleware = applyMiddleware(logger);
	return createStore(reducer, initial, compose(middleware));
}
