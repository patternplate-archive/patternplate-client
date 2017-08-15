import {connect} from 'react-redux';
import Code from '../components/code-button';

function mapProps(state) {
	return {
		base: state.base,
		enabled: state.codeEnabled,
		shortcut: state.shortcuts.toggleCode
	};
}

export default connect(mapProps)(Code);
