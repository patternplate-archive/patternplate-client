
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {highlightCode} from '../actions';
import Code from '../components/common/code';

export default connect(mapProps, mapDispatch)(Code);

function mapProps(state) {
	return {
		highlights: state.highlights
	};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onHighlightRequest: highlightCode
	}, dispatch);
}
