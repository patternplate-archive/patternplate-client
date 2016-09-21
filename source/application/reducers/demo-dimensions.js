import getIdByPathname from '../utils/get-id-by-pathname';
import handleDependentActions from '../actions/handle-dependent-actions';

export default handleDependentActions({
	'@@router/LOCATION_CHANGE': (state, action, {base}) => {
		const id = getIdByPathname(action.payload.pathname, base) || null;
		const x = Math.max(100, Number(action.payload.query.width));
		const y = Math.max(100, Number(action.payload.query.height));

		const previous = state[id] || {};

		if (previous.x !== x || previous.y !== y) {
			return {
				...state,
				[id]: {
					...state[id],
					x,
					y
				}
			};
		}
		return state;
	}
}, {defaultValue: {}, dependencies: ['base']});
