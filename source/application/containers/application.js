import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Application from '../components/application';

import {search, themeLoaded, toggleTheme} from '../actions';

export default connect(mapProps, mapDispatch)(Application);

function mapDispatch(dispatch) {
	return bindActionCreators({
		onSearch: search,
		onThemeLoaded: themeLoaded,
		onThemeChange: toggleTheme
	}, dispatch);
}

function mapProps(state, own) {
	return {
		activePattern: state.id,
		about: selectAbout(state),
		base: state.base,
		description: selectDescription(state),
		expanded: state.expanded,
		hierarchy: state.config.hierarchy,
		issue: state.issue,
		lightbox: state.lightbox,
		location: own.location,
		menuEnabled: state.menuEnabled,
		navigation: state.search ? state.searchMatches : state.navigation,
		path: own.location.pathname,
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

function selectAbout(state) {
	const schema = selectSchema(state);
	const base = {
		label: selectName(state),
		value: selectVersion(state)
	};
	const about = ['app', 'client', 'server']
		.map(type => {
			return {
				label: schema[`${type}Name`],
				value: schema[`${type}Value`]
			};
		});
	return [
		base,
		...about
	];
}

function selectDescription(state) {
	return selectSchema(state).description || '';
}

function selectName(state) {
	return selectSchema(state).name || '';
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
