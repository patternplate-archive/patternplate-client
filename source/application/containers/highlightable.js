import {connect} from 'react-redux';
import highlightCode from '../actions/highlight-code';

export function mapProps(state) {
	return {
		highlights: state.highlights
	};
}

export function mapDispatch(dispatch) {
	return {
		onHighlightRequest(payload) {
			return dispatch(highlightCode(payload));
		}
	};
}

export default connect(mapProps, mapDispatch);
