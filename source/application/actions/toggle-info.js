import {patchLocation} from './';

export default toggleInfo;
export const type = 'TOGGLE_INFO';

function toggleInfo() {
	return (dispatch, getState) => {
		dispatch(patchLocation({query: {'info-enabled': !getState().infoEnabled}}));
	};
}

toggleInfo.type = type;
