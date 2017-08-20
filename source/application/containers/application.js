import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';

import * as actions from '../actions';
import Application from '../components/application';
import * as item from '../selectors/item';
import themes from '../themes';

export default connect(mapProps, mapDispatch)(Application);

const selectThemes = createSelector(
	state => state.config.color,
	color => themes(color)
);

function mapProps(state) {
	return {
		codeEnabled: state.codeEnabled && item.selectType(state) === 'pattern',
		description: state.schema.description,
		infoEnabled: state.infoEnabled && item.selectType(state) === 'pattern',
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
