import {patchLocation} from './';

export default toggleIssue;
export const type = 'TOGGLE_ISSUE';

function toggleIssue() {
	return (dispatch, getState) => {
		const issue = !getState().issue;
		dispatch(patchLocation({query: {issue}}));
	};
}

toggleIssue.type = type;
