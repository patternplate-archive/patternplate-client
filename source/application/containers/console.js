import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import ConsoleLightbox from '../components/content/console';
import {applyState} from '../actions';

export default connect(mapProps, mapDispatch)(ConsoleLightbox);

function mapProps(state) {
	return {
		base: state.base,
		state: JSON.stringify(state, null, '  '),
		theme: state.theme,
		location: state.routing.locationBeforeTransitions
	};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onApplyState: applyState
	}, dispatch);
}
