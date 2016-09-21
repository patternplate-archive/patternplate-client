import handleDependentActions from '../actions/handle-dependent-actions';
import themeLoaded from '../actions/theme-loaded';

const defaultValue = [];
const dependencies = ['theme'];

const stylesReducer = handleDependentActions({
	'@@router/LOCATION_CHANGE': onLocationChange,
	[themeLoaded]: onThemeLoaded
}, {defaultValue, dependencies});

export default stylesReducer;

function onLocationChange(state, _, {theme}) {
	if (theme === state[state.length - 1]) {
		return state;
	}

	return [...state, theme];
}

function onThemeLoaded(state, action) {
	return [action.payload];
}
