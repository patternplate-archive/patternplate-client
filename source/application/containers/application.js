import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import Application from '../components/application';

export default connect(mapProps, mapDispatch)(Application);

function mapProps(state) {
	return {
		description: state.schema.description,
		lightbox: state.lightbox,
		navigationEnabled: state.navigationEnabled,
		searchEnabled: state.searchEnabled,
		theme: state.theme,
		title: state.config.title || state.schema.name
	};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onLoad: () => actions.listen({url: 'api'}),
		onResize: actions.windowResize
	}, dispatch);
}
