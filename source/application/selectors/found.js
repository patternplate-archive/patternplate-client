import Fuse from 'fuse.js';
import {uniqBy, sortBy} from 'lodash';
import {createSelector} from 'reselect';
import selectPool from './pool';
import {apply, parse} from './search';
import createRelationSelector from './relation';

const selectFuse = createSelector(
	selectPool,
	pool => {
		return new Fuse(pool, {
			id: 'id',
			keys: [
				'id',
				'contents',
				'mainfest.displayName',
				'manifest.name',
				'manifest.version',
				'manifest.tags',
				'manifest.flag'
			]
		});
	}
);

const selectMatches = createSelector(
	state => state.search,
	selectFuse,
	selectPool,
	(search, fuse, pool) => {
		if (typeof search !== 'string' || search.length < 3) {
			return [];
		}

		const perform = apply(fuse, pool);
		const query = parse(search);
		return perform(query);
	}
);

export const selectFound = createSelector(
	selectPool,
	selectMatches,
	(pool, matches) => {
		const sorted = uniqBy(sortBy(matches.map(match => pool.find(p => p.id === match)), 'type'), 'id');
		return sorted
			.filter(s => s.type !== 'folder')
			.map((s, i) => {
				s.index = i;
				return s;
			});
	}
);

export const selectDocs = createSelector(
	selectFound,
	found => found.filter(f => f.type === 'doc')
);

export const selectPatterns = createSelector(
	selectFound,
	found => found.filter(f => f.type === 'pattern')
);

export const selectSuggestion = createSelector(
	state => state.searchValue,
	selectPool,
	(search, pool) => {
		if (typeof search !== 'string' || search.length === 0) {
			return '';
		}

		const match = pool.find(m => [m.id, m.name, (m.manifest || {}).displayName].some(k => k && k.startsWith(search)));

		if (!match) {
			return '';
		}

		return [match.id, match.name, match.manifest.displayName].find(k => k && k.startsWith(search)) || '';
	}
);

export const selectActiveItem = createSelector(
	state => state,
	selectFound,
	state => state.searchPreview,
	(state, found, preview) => {
		const index = Math.min(preview, found.length - 1);
		const item = found[index];
		if (item) {
			const selectItem = () => item;
			const rel = key => createRelationSelector(key, selectItem)(state);
			item.index = index;
			item.demoDependents = rel('demoDependents');
			item.demoDependencies = rel('demoDependencies');
			item.dependents = rel('dependents');
			item.dependencies = rel('dependencies');
		}
		return item;
	}
);
