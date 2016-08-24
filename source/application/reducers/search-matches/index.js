import Fuse from 'fuse.js';
import {handleActions} from 'redux-actions';

import * as helpers from './helpers';

const defaultValue = [];

function createFuse(patterns) {
	return new Fuse(patterns, {
		id: 'id',
		threshold: 0.3,
		keys: [
			'id',
			'manifest.name',
			'manifest.displayName',
			'manifest.tags',
			'manifest.flag'
		]
	});
}

function locationChangeHandler(state, action, dependencies) {
	const {navigation, expanded} = dependencies;
	const {search = ''} = action.payload.query;

	if (!expanded) {
		return navigation;
	}

	// Check for a matching folder first
	// e.g. atoms/ => atoms
	/* const folder = helpers.searchFolder(search, navigation, {expanded: true});

	if (folder) {
		return folder;
	} */

	const stems = helpers.createStems(search);
	const tokens = helpers.createTokens(search);
	const patterns = helpers.getPatterns(navigation, tokens);

	const ids = stems.length > 0 ?
		createFuse(patterns, stems).search(stems.join(' ')) :
		patterns.map(pattern => pattern.id);

	// Boil down to single pattern if a fully qualified id has been entered
	const [direct] = ids.filter(id => id === search);
	const matches = direct ? [direct] : ids;

	return helpers.filterPatterns(navigation, matches);
}

export default function (state, action, dependencies) {
	return handleActions({
		'@@router/LOCATION_CHANGE': (...args) => locationChangeHandler(...[...args, dependencies])
	}, defaultValue)(state, action);
}
