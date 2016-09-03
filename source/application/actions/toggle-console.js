import {patchLocation} from './';

export default toggleConsoleLightbox;
export const type = 'TOGGLE_CONSOLE_LIGHTBOX';

function toggleConsoleLightbox() {
	return (dispatch, getState) => {
		const lightbox = getState().lightbox === 'console' ? null : 'console';
		dispatch(patchLocation({query: {lightbox}}));
	};
}

toggleConsoleLightbox.type = type;
