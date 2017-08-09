import {patchLocation} from './';

export default toggleNavigation;
export const type = 'TOGGLE_NAVIGATION';

function toggleNavigation() {
	return (dispatch, getState) => {
		dispatch(patchLocation({
			query: {
				'navigation-enabled': !getState().navigationEnabled
			}
		}));
	};
}

toggleNavigation.type = type;
