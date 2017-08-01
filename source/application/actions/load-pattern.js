import path from 'path';

import {loadPatternData, loadPatternFile, loadPatternDemo} from './';
import urlQuery from '../utils/url-query';

export default loadPattern;

function loadPattern(payload) {
	return async (dispatch, getState) => {
		const state = getState();

		if (state.id === '..') {
			return;
		}

		const location = state.routing.locationBeforeTransitions;
		const {environment = 'index'} = location.query;
		const type = path.basename(state.sourceId) === 'index.md' ?
			'source' : state.sourceType;

		const actions = [
			loadPatternData(),
			loadPatternDemo(payload)
		];

		const jobs = actions.map(dispatch);
		const id = urlQuery.parse(state.sourceId || '').pathname;

		if (id && id !== 'relations') {
			jobs.push(dispatch(loadPatternFile({
				base: state.base,
				environment,
				id: state.sourceId,
				type
			})));
		}

		await least(1000, Promise.all(jobs));
	};
}

function wait(timeout, value) {
	return new Promise(resolve => setTimeout(() => resolve(value), timeout));
}

function least(timeout, thenable) {
	const then = new Date();

	return Promise.resolve(thenable)
		.then(result => {
			const delta = 1000 - (new Date() - then) % 1000;
			return wait(delta, result);
		});
}
