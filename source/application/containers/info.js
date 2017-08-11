import {connect} from 'react-redux';
import Info from '../components/info';

function mapProps(state) {
	return {
		base: state.base,
		enabled: state.infoEnabled,
		location: state.routing.locationBeforeTransitions,
		shortcut: state.shortcuts.info
	};
}

export default connect(mapProps)(Info);
