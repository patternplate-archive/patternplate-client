import {connect} from 'react-redux';

import ShortcutsLightbox from '../components/content/shortcuts';

export default connect(mapProps)(ShortcutsLightbox);

function mapProps(state) {
	return {
		base: state.base,
		location: state.routing.locationBeforeTransitions,
		shortcuts: state.shortcuts
	};
}
