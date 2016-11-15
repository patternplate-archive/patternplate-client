import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {dismissMessage, loadPattern} from '../actions';
import Content from '../components/content';

export default connect(mapState, mapDispatch)(Content);

function mapState(state) {
	const {base, config, hide, navigation, pattern, messages, time} = state;
	return {base, config, hide, navigation, pattern, messages, time};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onDismiss: dismissMessage,
		onLoad: loadPattern,
		onRetry: loadPattern
	}, dispatch);
}
