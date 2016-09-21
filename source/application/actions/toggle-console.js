import {patchLocation} from './';

export default toggleConsoleLightbox;
export const type = 'TOGGLE_CONSOLE_LIGHTBOX';

function toggleConsoleLightbox(forced) {
	return (dispatch, getState) => {
		if (typeof forced !== 'undefined') {
			const lightbox = forced ? null : 'console';
			dispatch(patchLocation({query: {lightbox}}));
		}

		const lightbox = getState().lightbox === 'console' ? null : 'console';
		dispatch(patchLocation({query: {lightbox}}));
	};
}

toggleConsoleLightbox.type = type;
