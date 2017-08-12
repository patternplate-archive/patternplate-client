import {connect} from 'react-redux';
import Fullscreen from '../components/fullscreen';

function mapProps(state) {
	return {
		active: state.id.startsWith('pattern/'),
		id: state.id,
		href: `/demo/${state.id.replace(/^pattern\//, '')}/index.html`
	};
}

export default connect(mapProps)(Fullscreen);
