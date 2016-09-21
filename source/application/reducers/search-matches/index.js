import Fuse from 'fuse.js';

import * as helpers from './helpers';
import handleDependentActions from '../../actions/handle-dependent-actions';

const defaultValue = [];
const dependencies = ['expanded', 'navigation'];

const searchMatchReducer = handleDependentActions({
	'@@router/LOCATION_CHANGE': locationChangeHandler
}, {defaultValue, dependencies});

export default searchMatchReducer;

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
