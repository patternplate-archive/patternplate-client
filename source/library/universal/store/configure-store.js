import {createStore, applyMiddleware, compose} from 'redux';
import {reduxReactRouter as clientRouter} from 'redux-router';
import {reduxReactRouter as serverRouter} from 'redux-router/server';
import {devTools} from 'redux-devtools';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';
import createLogger from 'redux-logger';

import routes from '../routes/routes';
import rootReducer from '../reducers';

const client = typeof global.location !== 'undefined';
const router = client ?
	clientRouter({routes, createHistory}) :
	serverRouter({routes});

const chain = client ? [
	applyMiddleware(thunk),
	router,
	applyMiddleware(createLogger()),
	devTools()
] : [
	applyMiddleware(thunk),
	router
];

const createAugmentedStore = compose(...chain)(createStore);

export default function configureStore(initialState) {
	const store = createAugmentedStore(rootReducer, initialState);
	return store;
}
