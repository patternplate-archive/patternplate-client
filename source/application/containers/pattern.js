import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';
import selectItem from '../selectors/item';
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

const selectType = createSelector(
	selectItem,
	pattern => pattern ? pattern.type : 'not-found'
);

const selectContents = createSelector(
	selectItem,
	selectType,
	(pattern, type) => {
		if (type === 'not-found') {
			return NOT_FOUND;
		}
		return pattern.contents || DEFAULT_CONTENTS;
	}
);

const selectEnv = createSelector(
	state => state.environment,
	state => state.schema.envs,
	(env, envs) => envs.find(e => e.name === env)
);

const selectReloadTime = createSelector(
	state => state.pattern,
	pattern => pattern.reloadTime
);

function mapState(state) {
	return {
		base: state.base,
		contents: selectContents(state),
		env: selectEnv(state),
		id: state.id || '',
		opacity: state.opacity,
		pattern: selectItem(state),
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
