import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Application from '../components/application';

import {search, themeLoaded, toggleSearchFocus, toggleTheme, windowResize} from '../actions';

export default connect(mapProps, mapDispatch)(Application);

function mapProps(state, own) {
	return {
		activePattern: state.id,
		base: state.base,
		description: selectDescription(state),
		depth: state.depth,
		expanded: state.expanded,
		hierarchy: state.config.hierarchy,
		issue: state.issue,
		lightbox: state.lightbox,
		menuEnabled: state.menuEnabled,
		navigation: state.search ? state.searchMatches : state.navigation,
		pathname: own.location.pathname,
		query: own.location.query,
		search: own.location.query.search,
		styles: state.styles,
		theme: state.theme,
		themeLoading: selectThemeLoading(state),
		title: state.config.title || state.schema.name,
		version: selectVersion(state)
	};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onResize: windowResize,
		onSearch: search,
		onThemeLoaded: themeLoaded,
		onThemeChange: toggleTheme,
		requestSearchBlur: () => toggleSearchFocus(false)
	}, dispatch);
}

function selectDescription(state) {
	return selectSchema(state).description || '';
}

function selectVersion(state) {
	return selectSchema(state).version || '';
}

function selectSchema(state) {
	return state.schema || {};
}

function selectThemeLoading(state) {
	return state.styles.length > 1;
}
