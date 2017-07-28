import path from 'path';
import {connect} from 'react-redux';
import Documentation from '../components/documentation';

export default connect(mapState)(Documentation);

function mapState(state) {
	const doc = find(state.schema.docs, state.doc);

	return {
		base: state.base,
		doc: doc || {contents: notFound(state)},
		id: state.doc
	};
}

function find(tree, id, depth = 1) {
	const frags = id.split('/').filter(Boolean);
	const sub = frags.slice(0, depth).map(strip);
	const match = tree.children.find(child => child.path.every((s, i) => sub[i] === strip(s)));

	if (depth < frags.length) {
		return find(match, id, depth + 1);
	}

	return match;
}

function strip(b) {
	return path.basename(b, path.extname(b));
}

function notFound(state) {
	const url = state.routing.locationBeforeTransitions.pathname;
	return `
# Documentation not found

> Pretty sure these aren't the hypertext documents you are looking for.

We looked everywhere and could not find a single thing at \`${url}\`.

You might want to navigate back to [Home](/) or use the search.

---

Help us to make this message more helpful on [GitHub](https://github.com/sinnerschrader/patternplate)
`;
}
