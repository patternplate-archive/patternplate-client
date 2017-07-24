import {connect} from 'react-redux';
import Documentation from '../components/documentation';

export default connect(mapState)(Documentation);

function mapState() {
	return {};
}
