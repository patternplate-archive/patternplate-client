import {isEqual} from 'lodash';
import {demoContentResize} from '../actions';
import handleDependentActions from '../actions/handle-dependent-actions';

const defaultValue = {};

export default handleDependentActions({
	[demoContentResize]: (state, {payload}, {pattern}) => {
		const previous = state[pattern.id];
		const next = {width: payload.width, height: payload.height};
		if (!isEqual(previous, next)) {
			return {
				...state,
				[pattern.id]: next
			};
		}
		return state;
	}
}, {defaultValue, dependencies: ['pattern']});
