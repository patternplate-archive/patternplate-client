import {patchLocation} from './';

export default toggleRulers;
export const type = 'TOGGLE_RULERS';

function toggleRulers() {
	return (dispatch, getState) => {
		const rulers = getState().rulers;
		dispatch(patchLocation({query: {rulers: !rulers}}));
	};
}

toggleRulers.type = type;
