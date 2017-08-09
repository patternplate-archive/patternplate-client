import path from 'path';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import Documentation from '../components/documentation';

export default connect(mapState)(Documentation);

const selectId = state => state.doc;
const selectDocs = state => state.schema.docs;

const selectMatch = createSelector(
	selectDocs,
	selectId,
	(docs, id) => find(docs, id)
);

const selectNotFound = createSelector(
	state => state.routing.locationBeforeTransitions.pathname,
	url => `
# Documentation not found

> Pretty sure these aren't the hypertext documents you are looking for.

We looked everywhere and could not find a single thing at \`${url}\`.

You might want to navigate back to [Home](/) or use the search.

---

Help us to make this message more helpful on [GitHub](https://github.com/sinnerschrader/patternplate)
`
);

const selectNoDocs = () => `
# :construction: Add documentation

> Undocumented software could not exist just as well.
>
> – The Voice of Common Sense

Currently there is no readme data at \`./patterns/readme.md\`, so we left this
friendly reminder here to change that soon.

You could start right away:

\`\`\`sh
echo "# Docs\\n This patternplate contains ..." > patterns/readme.md
\`\`\`

Some ideas on what to write into your pattern readme

*  Why this Living Styleguide interface exists, e.g. what problems it should solve
*  What the components in are intended for, e.g. a brand, website or product
*  The component hierarchy you use, e.g. Atomic Design
*  Naming conventions
*  Rules for dependencies
*  Browser matrix

---

Help us to make this message more helpful on [GitHub](https://github.com/sinnerschrader/patternplate).
`;

const selectDoc = createSelector(
	selectMatch,
	selectNoDocs,
	selectNotFound,
	(match, noDocs, notFound) => {
		if (match && match.contents) {
			return match;
		}

		if (match && !match.contents) {
			return {...match, contents: noDocs};
		}

		return {id: 'root', contents: notFound};
	}
);

function mapState(state) {
	return {
		base: state.base,
		doc: selectDoc(state)
	};
}

function find(tree, id, depth = 1) {
	if (id === '/') {
		return tree;
	}

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
