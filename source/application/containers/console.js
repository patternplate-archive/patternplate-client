import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import ConsoleLightbox from '../components/content/console';
import {applyState, toggleConsole} from '../actions';

export default connect(mapProps, mapDispatch)(ConsoleLightbox);

function mapProps(state) {
	return {
		base: state.base,
		location: state.routing.locationBeforeTransitions,
		state: JSON.stringify(state, null, '  '),
		theme: state.theme
	};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onApplyState: applyState,
		onClose: () => toggleConsole(false)
	}, dispatch);
}
