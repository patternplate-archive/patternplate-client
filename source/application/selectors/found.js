import Fuse from 'fuse.js';
import {sortBy} from 'lodash';
import {createSelector} from 'reselect';
import selectPool from './pool';
import {apply, parse} from './search';

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
		const sorted = sortBy(matches.map(match => pool.find(p => p.id === match)), 'type');
		return sorted.map((s, i) => {
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

		const match = pool.find(m => [m.id, m.name, m.manifest.displayName].some(k => k && k.startsWith(search)));

		if (!match) {
			return '';
		}

		return [match.id, match.name, match.manifest.displayName].find(k => k && k.startsWith(search)) || '';
	}
);

export const selectActiveItem = createSelector(
	selectFound,
	state => state.searchPreview,
	(found, preview) => {
		const index = Math.min(preview, found.length - 1);
		const item = found[index];
		if (item) {
			item.index = index;
		}
		return item;
	}
);
