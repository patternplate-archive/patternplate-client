import {connect} from 'react-redux';
import {push, replace} from 'react-router-redux';
import Application from '../components/application';

import themeLoaded from '../actions/theme-loaded';

export default connect(mapProps, mapDispatch)(Application);

function mapProps(state, own) {
	return {
		activePattern: state.id,
		about: selectAbout(state),
		base: state.base,
		breadcrumbs: selectBreadCrumbs(state),
		description: selectDescription(state),
		expanded: state.expanded,
		hierarchy: state.config.hierarchy,
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

function mapDispatch(dispatch, own) {
	return {
		onSearch(search) {
			const location = {
				pathname: own.location.pathname,
				query: {
					...own.location.query,
					search
				}
			};
			return dispatch(replace(location));
		},
		onThemeLoaded(theme) {
			return dispatch(themeLoaded(theme));
		},
		onThemeChange(theme) {
			const location = {
				pathname: own.location.pathname,
				query: {
					...own.location.query,
					theme
				}
			};
			return dispatch(push(location));
		}
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

function selectBreadCrumbs(state) {
	const fragments = selectId(state).split('/');
	const location = selectLocation(state);

	if (fragments.length < 2) {
		return [];
	}

	return fragments.map((fragment, index) => {
		const partial = fragments.slice(0, index + 1).join('/');
		return {
			id: partial,
			name: fragment,
			navigateable: index < fragments.length - 1,
			target: {
				pathname: `${state.base}pattern/${partial}`,
				query: location.query
			}
		};
	});
}

function selectDescription(state) {
	return selectSchema(state).description || '';
}

function selectId(state) {
	return state.id || '';
}

function selectLocation(state) {
	return state.routing.locationBeforeTransitions;
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
