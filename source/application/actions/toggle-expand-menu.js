import {patchLocation} from './';

export default toggleExpandMenu;
export const type = 'TOGGLE_EXPAND_MENU';

function toggleExpandMenu() {
	return (dispatch, getState) => {
		dispatch(patchLocation({
			query: {
				expanded: !getState().expanded
			}
		}));
	};
}

toggleExpandMenu.type = type;
