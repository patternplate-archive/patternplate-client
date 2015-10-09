import React from 'react';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';

import configureStore from './store/configure-store';

export default function (initialState) {
	const store = configureStore(initialState);

	return (
		<Provider store={store}>
			<ReduxRouter />
		</Provider>
	);
}
