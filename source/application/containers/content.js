import {connect} from 'react-redux';
import Content from '../components/content';

export default connect(state => {
	const {base, config, navigation, patterns, messages, time} = state;
	return {base, config, navigation, patterns, messages, time};
})(Content);
