import path from 'path';
import {createAction} from 'redux-actions';

import getPatternData from './get-pattern-data';
import getPatternFile from './get-pattern-file';
import reloadPatternDemo from './reload-pattern-demo';

export default reloadPattern;
export const reloadPatternStart = createAction('RELOAD_PATTERN_START');

function reloadPattern() {
	return async (dispatch, getState) => {
		const state = getState();
		const location = state.routing.locationBeforeTransitions;
		const {environment = 'index'} = location.query;
		const type = path.basename(state.sourceId) === 'index.md' ?
			'source' : state.sourceType;

		const jobs = [];

		jobs.push(dispatch(reloadPatternStart()));

		jobs.push(dispatch(getPatternData({
			id: state.id,
			query: {
				environment
			},
			options: {
				base: state.base
			}
		})));

		jobs.push(dispatch(reloadPatternDemo()));

		if (state.sourceId) {
			jobs.push(dispatch(getPatternFile({
				base: state.base,
				environment,
				id: state.sourceId,
				type
			})));
		}

		await Promise.all(jobs);
		dispatch(createAction('RELOAD_PATTERN_SUCCESS')());
	};
}
