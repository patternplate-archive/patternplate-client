import {noop} from 'lodash';
export default toggleSearchFocus;
export const type = 'TOGGLE_SEARCH_FOCUS';

const faux = {blur: noop, focus: noop};

function toggleSearchFocus(forced) {
	return () => {
		const {document} = global;
		const el = document.querySelector('input[type=search]') || faux;

		if (typeof forced === 'undefined') {
			const isActive = document.activeElement === el;
			const method = isActive ? el.blur : el.focus;
			method.bind(el)();
		} else {
			const method = forced ? el.focus : el.blur;
			method.bind(el)();
		}

		return dispatch => {
			dispatch({type: 'TOGGLED_SEARCH_FOCUS'});
		};
	};
}

toggleSearchFocus.type = type;
