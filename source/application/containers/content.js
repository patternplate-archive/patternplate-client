import path from 'path';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {dismissMessage, loadPattern} from '../actions';
import Content from '../components/content';

export default connect(mapState, mapDispatch)(Content);

function mapState(state) {
	const {base, config, hide, navigation, messages, time} = state;
	return {base, config, hide, item: selectItem(state), navigation, messages, time};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onDismiss: dismissMessage,
		onRetry: loadPattern
	}, dispatch);
}

function selectItem(state) {
	return find(state.navigation, state.id);
}

function find(tree, id, depth = 1) {
	const frags = id.split('/').filter(Boolean);
	const sub = frags.slice(0, depth).map(strip);
	const match = tree.children.find(child => child.path.every((s, i) => sub[i] === strip(s)));

	if (match && depth < frags.length) {
		return find(match, id, depth + 1);
	}

	return match;
}

function strip(b) {
	return path.basename(b, path.extname(b));
}
