import {patchLocation} from './';

export default toggleKeyboardShortcuts;
export const type = 'TOGGLE_KEYBOARD_SHORTCUTS';

function toggleKeyboardShortcuts() {
	return (dispatch, getState) => {
		const lightbox = getState().lightbox === 'shortcuts' ? null : 'shortcuts';
		dispatch(patchLocation({query: {lightbox}}));
	};
}

toggleKeyboardShortcuts.type = type;
