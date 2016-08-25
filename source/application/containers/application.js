import {connect} from 'react-redux';
import {push, replace} from 'react-router-redux';
import Application from '../components';

export default connect(mapProps, mapDispatch)(Application);

function mapProps(state, own) {
	return {
		about: selectAbout(state),
		base: state.base,
		hierarchy: state.config.hierarchy,
		location: own.location,
		navigation: state.search ? state.searchMatches : state.navigation,
		path: own.location.pathname,
		pathname: own.location.pathname,
		query: own.location.query,
		search: own.location.query.search,
		theme: state.theme,
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

function selectName(state) {
	return selectSchema(state).name || '';
}

function selectVersion(state) {
	return selectSchema(state).version || '';
}

function selectSchema(state) {
	return state.schema || {};
}
