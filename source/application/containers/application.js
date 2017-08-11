import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';

import * as actions from '../actions';
import Application from '../components/application';
import themes from '../themes';

export default connect(mapProps, mapDispatch)(Application);

const selectThemes = createSelector(
	state => state.config.color,
	color => themes(color)
);

function mapProps(state) {
	return {
		description: state.schema.description,
		infoEnabled: state.infoEnabled,
		lightbox: state.lightbox,
		navigationEnabled: state.navigationEnabled,
		searchEnabled: state.searchEnabled,
		theme: state.theme,
		themes: selectThemes(state),
		title: state.config.title || state.schema.name
	};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onLoad: () => actions.listen({url: 'api'}),
		onResize: actions.windowResize
	}, dispatch);
}
