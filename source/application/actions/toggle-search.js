import {patchLocation, search} from './';
export default toggleSearch;

export const type = 'TOGGLE_SEARCH';

function toggleSearch(payload = {}) {
	return (dispatch, getState) => {
		const state = getState();

		if (payload.sync) {
			focus(state.searchEnabled);
			return;
		}

		const next = ('focus' in payload) ? payload.focus : !state.searchEnabled;

		if (!next) {
			dispatch(search({persist: true, value: value()}));
		}

		dispatch(patchLocation({query: {'search-enabled': next}}));
	};
}

toggleSearch.type = type;

function focus(next) {
	if (!next) {
		return;
	}

	if (!('document' in global)) {
		return;
	}

	setTimeout(() => {
		const el = global.document.query('input[type=search]');
		if (!el) {
			return;
		}
		el.focus();
	}, 100);
}

function value() {
	if (!('document' in global)) {
		return;
	}

	const el = global.document.query('input[type=search]');

	if (!el) {
		return;
	}

	return el.value;
}
