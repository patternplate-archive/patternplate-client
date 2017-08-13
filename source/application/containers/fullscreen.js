import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import selectItem from '../selectors/item';
import Fullscreen from '../components/fullscreen';

const selectActive = createSelector(
	selectItem,
	item => item && item.type === 'pattern'
);

const selectHref = createSelector(
	selectItem,
	item => `/demo/${item.id}/index.html`
);

function mapProps(state) {
	return {
		active: selectActive(state),
		id: state.id,
		href: selectHref(state)
	};
}

export default connect(mapProps)(Fullscreen);
