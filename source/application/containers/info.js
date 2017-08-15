import {connect} from 'react-redux';
import Info from '../components/info';

function mapProps(state) {
	return {
		enabled: state.infoEnabled,
		shortcut: state.shortcuts.info
	};
}

export default connect(mapProps)(Info);
