import React from 'react';
import {renderToString as render} from 'react-dom/server';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';
import {match} from 'redux-router/server';

import configureStore from './store/configure-store';
import HTMLDocument from './components/html-document/html-document';

export default function (location) {
	const store = configureStore({});

	return new Promise((resolve, reject) => {
		store.dispatch(match(location, (error, redirect) => {
			if (error) {
				reject(error);
			} else if (redirect) {
				reject(new Error('Redirects with react-router are not supported yet.'));
			} else {
				return resolve(render(
					<HTMLDocument state={store.getState()}>
						<Provider store={store}>
							<ReduxRouter />
						</Provider>
					</HTMLDocument>
				));
			}
		}));
	});
}
