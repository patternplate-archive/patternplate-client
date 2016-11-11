import {connect} from 'react-redux';
import unescapeHtml from 'unescape-html';
import Home from '../components/content/home';

export default connect(state => {
	return {
		base: state.base,
		readme: unescapeHtml(state.schema.readme)
	};
})(Home);
