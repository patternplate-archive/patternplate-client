// import 'babel-core/polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';

import configureStore from '../../universal/store/configure-store';
// import devTools from './dev-tools';

const queries = {
	mount: () => document.querySelectorAll('[data-mount]'),
	data: key => document.querySelectorAll(`[data-mount-data=${key}]`)
};

function deserialize(key) {
	const elements = [...queries.data(key)];
	return elements.reduce((result, element) => {
		return {...result, ...JSON.parse(element.textContent)};
	}, {});
}

function mount(element) {
	const data = deserialize(element.dataset.mount);
	const store = configureStore(data);
	render(<Provider store={store}><ReduxRouter /></Provider>, element);
}

function main() {
	const mountElements = [...queries.mount()];
	mountElements.map(mount);
}

main();
