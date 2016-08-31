import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {highlightCode} from '../actions';

export function mapProps(state) {
	return {
		highlights: state.highlights
	};
}

export function mapDispatch(dispatch) {
	return bindActionCreators({
		onHighlightRequest: highlightCode
	}, dispatch);
}

export default connect(mapProps, mapDispatch);
