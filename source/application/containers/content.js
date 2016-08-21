import {connect} from 'react-redux';
import Content from '../components/content';

export default connect(state => {
	const {config, navigation, patterns, messages, time} = state;
	return {config, navigation, patterns, messages, time};
})(Content);
