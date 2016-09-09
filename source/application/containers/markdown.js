// import highlightable from './highlightable';
import {connect} from 'react-redux';
import Markdown from '../components/common/markdown';

export function mapProps(state) {
	const location = state.routing.locationBeforeTransitions;
	return {
		base: state.base,
		query: location.query
	};
}

export default connect(mapProps)(Markdown);
