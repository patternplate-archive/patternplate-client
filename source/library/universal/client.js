import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';

import configureStore from './store/configure-store';

export default function (data, element) {
	const store = configureStore(data);
	return render(<Provider store={store}><ReduxRouter /></Provider>, element);
}
