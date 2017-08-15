import assert from 'assert';
import {connect} from 'react-redux';
import {values} from 'lodash';
import shortcuts from '../shortcuts';

const s = values(shortcuts());

export default function withToggle(action) {
	const shortcut = s.find(i => i.key === action.key);

	assert(shortcut, `${action} passed to withToggle has no shortcut available`);

	return Component => {
		const mapProps = state => {
			const enabled = state[action.property];
			return {enabled, shortcut};
		};
		return connect(mapProps)(Component);
	};
}
