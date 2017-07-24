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
		docs: state.schema.docs || [],
		expanded: state.expanded,
		hide: state.hide,
		hierarchy: state.config.hierarchy,
		issue: state.issue,
		lightbox: state.lightbox,
		logo: state.config.logo || 'patternplate',
		menuEnabled: state.menuEnabled,
		navigation: state.search ? state.searchMatches : selectNavigation(state),
		pathname: own.location.pathname,
		query: own.location.query,
		search: own.location.query.search,
		startBase: state.startBase,
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

function selectNavigation(state) {
	return sanitizeNavigationTreeData({children: state.navigation}, state.hide);
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

function sanitizeNavigationTreeData(data, hide) {
	if (data.manifest) {
		return hide && data.manifest.display === false ? null : data;
	}

	return Object.entries(data.children)
		.reduce((results, entry) => {
			const [name, child] = entry;
			const grandChildren = sanitizeNavigationTreeData(child, hide);
			if (grandChildren && Object.keys(grandChildren).length > 0) {
				results[name] = child;
			}
			return results;
		}, {});
}
