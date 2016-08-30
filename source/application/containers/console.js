import {connect} from 'react-redux';

import ConsoleLightbox from '../components/content/console';
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
	return {
		onApplyState(payload) {
			dispatch({
				type: '@@APPLY_STATE',
				payload
			});
		}
	};
}
