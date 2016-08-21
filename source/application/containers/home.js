import {connect} from 'react-redux';
import Home from '../components/content/home';

export default connect(state => {
	return {readme: state.schema.readme};
})(Home);
