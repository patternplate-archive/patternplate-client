import {flatten, intersection} from 'lodash';
import semver from 'semver';
import q from 'logic-query-parser';

export function apply(fuse, pool) {
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

export function match(fuse, pool) {
	return term => {
		const [field, value] = term.split(':');

		if (field && value) {
			return searchField(pool, {field, value});
		}

		return fuse.search(term);
	};
}

export function parse(search) {
	try {
		return q.utils.binaryTreeToQueryJson(q.parse(search));
	} catch (err) {
		return {type: 'and', values: []};
	}
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
