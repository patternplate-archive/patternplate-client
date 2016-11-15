import {patchLocation} from './';

export default toggleHide;
export const type = 'TOGGLE_HIDE';

function toggleHide() {
	return (dispatch, getState) => {
		const hide = !getState().hide;
		dispatch(patchLocation({query: {hide}}));
	};
}

toggleHide.type = type;
