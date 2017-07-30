import {connect} from 'react-redux';
import Indicator from '../components/indicator';

function mapProps(state) {
	return {
		status: state.connection
	};
}

export default connect(mapProps)(Indicator);
