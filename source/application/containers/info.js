import {connect} from 'react-redux';
import Info from '../components/info';

function mapProps(state) {
	return {
		base: state.base,
		enabled: state.infoEnabled,
		navigationEnabled: state.navigationEnabled,
		location: state.routing.locationBeforeTransitions,
		shortcut: state.shortcuts.info
	};
}

export default connect(mapProps)(Info);
