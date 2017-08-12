import path from 'path';
import frontmatter from 'front-matter';

const WEIGHTS = {
	folder: 0,
	doc: 1,
	pattern: 2
};

export function flatten(tree) {
	if (!tree) {
		return [];
	}

	const init = tree.id === 'root' ? [] : [{
		contents: tree.contents,
		demoDependencies: tree.demoDependencies,
		demoDependents: tree.demoDependents,
		dependencies: tree.dependencies,
		dependents: tree.dependents,
		id: tree.id,
		manifest: tree.manifest,
		name: tree.name,
		type: tree.type
	}];

	return (tree.children || [])
		.reduce((reg, child) => {
			return [...reg, ...flatten(child)];
		}, init);
}

export function sanitize(tree, context) {
	const {hide, id, config = {}, prefix} = context;
	const filter = hide ? child => !child.manifest.options.hidden : i => i;

	tree.children = tree.children
		.filter(filter)
		.map(child => {
			const enriched = enrich(child, {hide, id, config, prefix});
			return enriched.children ? sanitize(enriched, {hide, id, config, prefix}) : enriched;
		})
		.sort((a, b) => {
			const order = (a.manifest.options.order || 0) - (b.manifest.options.order || 0);
			const weight = (WEIGHTS[a.type] || 0) - (WEIGHTS[b.type] || 0);
			const comp = a.manifest.displayName.localeCompare(b.manifest.displayName);

			if (order !== 0) {
				return order;
			}

			if (weight !== 0) {
				return weight;
			}

			return comp;
		});

	return enrich(tree, {id, config, prefix});
}

export function enrich(child, {id, config, prefix}) {
	const p = prefix.split('/');
	const fragments = id.split('/').filter((f, i) => p[i] !== f);

	child.active = child.id === 'root' ?
		id === '/' :
		(child.path || ['/']).every((f, i) => fragments[i] === f);

	child.href = child.href || path.join(prefix, child.id);

	if (child.id in config) {
		const o = config[child.id];
		child.manifest.displayName = o.displayName || child.manifest.displayName;
		child.manifest.options.order = o.order || child.manifest.options.order;
		child.manifest.options.icon = o.icon || child.manifest.options.icon;
	}

	// If there is no special content in a folder show the first child
	if (child.children && child.children.length > 0 && (!child.contents || !frontmatter(child.contents).body)) {
		child.href = child.children[0].href;
	}

	return child;
}
