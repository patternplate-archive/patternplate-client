import {connect} from 'react-redux';
import Opacity from '../components/opacity';

function mapProps(state) {
	return {
		active: state.id.startsWith('pattern/'),
		enabled: state.opacity,
		location: state.routing.locationBeforeTransitions,
		shortcut: state.shortcuts.toggleOpacity
	};
}

export default connect(mapProps)(Opacity);
