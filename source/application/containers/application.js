import {connect} from 'react-redux';
import {replace} from 'react-router-redux';
import Application from '../components';

export default connect(mapProps, mapDispatch)(Application);

function mapProps(state, own) {
	return {
		base: state.base,
		hierarchy: state.config.hierarchy,
		location: own.location,
		navigation: state.search ? state.searchMatches : state.navigation,
		path: own.location.pathname,
		pathname: own.location.pathname,
		query: own.location.query,
		search: own.location.query.search,
		theme: state.theme,
		title: state.config.title || state.schema.name
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
		}
	};
}
