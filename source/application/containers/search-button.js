import {connect} from 'react-redux';
import SearchButton from '../components/search-button';

function mapProps(state) {
	return {
		base: state.base,
		enabled: state.searchEnabled,
		location: state.routing.locationBeforeTransitions,
		shortcut: state.shortcuts.toggleSearch
	};
}

export default connect(mapProps)(SearchButton);
