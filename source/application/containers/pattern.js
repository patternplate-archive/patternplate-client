import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';
import Pattern from '../components/pattern';

import * as actions from '../actions';

export default connect(mapState, mapDispatch)(Pattern);

const DEFAULT_CONTENTS = `
# :construction: Add documentation

> Undocumented software could not exist just as well.
>
> – The Voice of Common Sense

Currently there is no readme data for this pattern folder.
We left this friendly reminder for you to change that soon.

---

Help us to make this message more helpful on [GitHub](https://github.com/sinnerschrader/patternplate).
`;

const NOT_FOUND = `
# Pattern not found

> Pretty sure this is not the component you are looking for.

We looked everywhere and could not find a single thing.

You might want to navigate back to [Home](/) or use the search.

---

Help us to make this message more helpful on [GitHub](https://github.com/sinnerschrader/patternplate)
`;

const selectPattern = createSelector(
	state => state.schema.meta,
	state => state.id,
	(meta, id) => find(meta, id)
);

const selectType = createSelector(
	selectPattern,
	pattern => pattern ? pattern.type : 'not-found'
);

const selectContents = createSelector(
	selectPattern,
	selectType,
	(pattern, type) => {
		if (type === 'not-found') {
			return NOT_FOUND;
		}
		return pattern.contents || DEFAULT_CONTENTS;
	}
);

const selectReloadTime = createSelector(
	state => state.pattern,
	pattern => pattern.reloadTime
);

function mapState(state) {
	return {
		base: state.base,
		contents: selectContents(state),
		id: state.id || '',
		pattern: selectPattern(state),
		reloadTime: selectReloadTime(state),
		type: selectType(state)
	};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onDemoError: actions.patternDemoError,
		onDemoReady: actions.patternDemoLoaded
	}, dispatch);
}

function find(tree, id, depth = 1) {
	if (id === '/') {
		return tree;
	}

	if (!id || !id.startsWith('pattern/')) {
		return null;
	}

	const frags = id.replace(/^pattern\//, '').split('/').filter(Boolean);
	const sub = frags.slice(0, depth);

	const match = tree.children.find(child => child.path.every((s, i) => sub[i] === s));

	if (match && depth < frags.length) {
		return find(match, id, depth + 1);
	}

	return match;
}
