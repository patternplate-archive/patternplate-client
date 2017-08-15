import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';
import selectItem from '../selectors/item';
import * as demo from '../selectors/demo';
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

function mapState(state) {
	return {
		contents: selectContents(state),
		demoSrc: demo.selectSrc(state),
		opacity: state.opacity,
		type: selectType(state)
	};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onDemoError: actions.patternDemoError,
		onDemoReady: actions.patternDemoLoaded
	}, dispatch);
}
