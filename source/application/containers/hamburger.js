import {connect} from 'react-redux';
import Hamburger from '../components/hamburger';

function mapProps(state) {
	return {
		base: state.base,
		enabled: state.navigationEnabled,
		location: state.routing.locationBeforeTransitions,
		shortcut: state.shortcuts.toggleNavigation
	};
}

export default connect(mapProps)(Hamburger);
