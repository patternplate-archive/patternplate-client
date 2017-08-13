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
		const [f, value] = term.split('=').map(t => t.trim());
		const field = f.replace(/!$/, '');

		if (field && value) {
			return searchField(pool, {field, value, negated: f !== field});
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

function searchField(pool, {value, field, negated}) {
	const tester = test(field, value);

	return pool
		.filter(item => typeof item.manifest === 'object')
		.filter(item => negated ? !tester(item) : tester(item))
		.map(i => i.id);
}

function test(field, value) {
	return item => {
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
	};
}
