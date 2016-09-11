import {connect} from 'react-redux';

import Ruler from '../components/pattern/pattern-ruler';
export default connect(mapProps)(Ruler);

function mapProps(state) {
	return {
		x: state.scrollDemoX.x,
		y: state.scrollDemoY.y
	};
}
