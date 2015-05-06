import humanize from 'string-humanize';

function humanizeTree (tree) {
	for (let leafName of Object.keys(tree)) {
		let sub = tree[leafName];

		if (typeof sub === 'object') {
			sub = humanizeTree(sub);
			tree[humanize(leafName)] = sub;
			delete tree[leafName];
		} else {
			tree[leafName] = humanize(leafName);
		}
	}

	return tree;
}

export default humanizeTree;
