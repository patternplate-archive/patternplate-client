import Fuse from 'fuse.js';
import {flatten, intersection, sortBy} from 'lodash';
import q from 'logic-query-parser';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';
import semver from 'semver';

import * as actions from '../actions';
import Search from '../components/search';

const selectSearch = state => state.search;

const selectDocs = createSelector(
	state => state.schema.docs,
	flattenTree
);

const selectNavigation = createSelector(
	state => state.schema.meta,
	flattenTree
);

const selectPool = createSelector(
	selectDocs,
	selectNavigation,
	(docs, nav) => [...docs, ...nav].filter(i => i.type !== 'folder')
);

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
	selectSearch,
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

function apply(fuse, pool) {
	const m = match(fuse, pool);
	return function perform(query) {
		switch (query.type) {
			case 'and': {
				return intersection(...query.values.map(value => perform(value)));
			}
			case 'or': {
				return flatten(query.values.map(value => perform(value)));
			}
			case 'string':
			default:
				return m(query.value || '');
		}
	};
}

function match(fuse, pool) {
	return term => {
		const [field, value] = term.split(':');

		if (field && value) {
			return searchField(pool, {field, value});
		}

		return fuse.search(term);
	};
}

function parse(search) {
	try {
		return q.utils.binaryTreeToQueryJson(q.parse(search));
	} catch (err) {
		return {type: 'and', values: []};
	}
}

const selectFound = createSelector(
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

const selectFoundDocs = createSelector(
	selectFound,
	found => found.filter(f => f.type === 'doc')
);

const selectFoundComponents = createSelector(
	selectFound,
	found => found.filter(f => f.type === 'pattern')
);

const selectSuggestion = createSelector(
	selectSearch,
	selectMatches,
	(search, matches) => matches.find(m => m.startsWith(search))
);

const selectPreview = state => state.searchPreview;

const selectActiveItem = createSelector(
	selectFound,
	selectPreview,
	(found, preview) => {
		const index = Math.min(preview, found.length - 1);
		const item = found[index];
		if (item) {
			item.index = index;
		}
		return item;
	}
);

function flattenTree(tree) {
	if (!tree) {
		return [];
	}

	const init = tree.id === 'root' ? [] : [{
		id: tree.id,
		name: tree.name,
		type: tree.type,
		contents: tree.contents,
		manifest: tree.manifest
	}];

	return (tree.children || [])
		.reduce((reg, child) => {
			return [...reg, ...flattenTree(child)];
		}, init);
}

function searchField(pool, {value, field}) {
	return pool
		.filter(item => {
			switch (field) {
				case 'options.automount':
					return (item.manifest.options || {}).automount;
				case 'tag':
				case 'tags':
					return (item.manifest.tags || []).includes(value);
				case 'version':
					return semver.valid(item.manifest.version) ? semver.satisfies(item.manifest.version, value) : false;
				case 'flag':
				default:
					return item[field] === value || item.manifest[field] === value;
			}
		})
		.map(i => i.id);
}

function mapProps(state) {
	const suggestion = selectSuggestion(state);

	return {
		activeItem: selectActiveItem(state),
		base: state.base,
		components: selectFoundComponents(state),
		docs: selectFoundDocs(state),
		enabled: state.searchEnabled,
		location: state.routing.locationBeforeTransitions,
		shortcuts: state.shortcuts,
		value: state.search,
		suggestion
	};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onChange: e => actions.search({persist: false, value: e.target.value}),
		onClear: () => actions.search({persist: true, value: ''}),
		onComplete: value => actions.search({persist: true, value}),
		onFocus: () => actions.toggleSearch({focus: true}),
		onMount: () => actions.toggleSearch({sync: true}),
		onNavigate: pathname => actions.patchLocation({pathname, query: {'search-enabled': false}}),
		onSubmit: e => {
			e.preventDefault();
			return actions.search({persist: true, value: e.target.search.value});
		},
		onUp: () => actions.searchPreview('up'),
		onDown: () => actions.searchPreview('down'),
		onActivate: index => actions.searchPreview(index),
		onStop: e => actions.search({persist: true, value: e.target.value})
	}, dispatch);
}

export default connect(mapProps, mapDispatch)(Search);
