export function matchPattern(pattern, criteria = {}) {
	if (Object.keys(criteria).length === 0) {
		return true;
	}

	return Object.entries(criteria)
		.every(item => {
			const [name, values] = item;

			if (values.length === 0) {
				return true;
			}

			if (name === 'tags') {
				const tags = pattern.manifest.tags || [];
				return values.some(tag => tags.includes(tag));
			} else if (name === 'flags') {
				const flag = pattern.manifest.flag || '';
				return values.some(valueFlag => valueFlag === flag);
			} else if (name === 'depends') {
				const dependencies = Object.keys(pattern.manifest.patterns || {});
				return values.some(dependency => dependencies.includes(dependency));
			} else if (name === 'provides') {
				const dependents = Object.keys(pattern.manifest.dependentPatterns || {});
				return values.some(dependent => dependents.includes(dependent));
			}

			return true;
		});
}

export function getPatterns(haystack, criteria = {}) {
	return Object.values(haystack)
		.reduce((registry, item) => {
			if (item.type === 'pattern') {
				return matchPattern(item, criteria) ?
					[...registry, item] :
					registry;
			} else if (item.type === 'folder') {
				return [...registry, ...getPatterns(item.children, criteria)];
			}
			return registry;
		}, []);
}

export function filterPatterns(patterns, ids) {
	return getPatterns(patterns)
		.filter(({id}) => ids.includes(id))
		.reduce((registry, item) => {
			const fragments = item.id.split('/');
			const key = fragments[fragments.length - 1];
			return {
				...registry,
				[key]: item
			};
		}, {});
}

const tokenKeys = ['tag', 'flag', 'depends', 'provides'];

function matchesToken(key, token) {
	return token.startsWith(`${key}:`);
}

export function isToken(token) {
	return tokenKeys.some(tokenKey => matchesToken(tokenKey, token));
}

export function isStem(token) {
	return !isToken(token);
}

export function isTagToken(token) {
	return matchesToken('tag', token);
}

export function isFlagToken(token) {
	return matchesToken('flag', token);
}

export function isDependsToken(token) {
	return matchesToken('depends', token);
}

export function isProvidesToken(token) {
	return matchesToken('provides', token);
}

export function getTokenValues(token) {
	return token
		.split(':')
		.slice(1)
		.join('.')
		.split(',')
		.filter(Boolean)
		.map(item => item.trim());
}
