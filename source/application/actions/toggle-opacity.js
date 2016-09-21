import {patchLocation} from './';

export default toggleOpacity;
export const type = 'TOGGLE_OPACITY';

function toggleOpacity() {
	return (dispatch, getState) => {
		const opacity = getState().opacity;
		dispatch(patchLocation({query: {opacity: !opacity}}));
	};
}

toggleOpacity.type = type;
