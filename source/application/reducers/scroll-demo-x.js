import handleDependentActions from '../actions/handle-dependent-actions';

export default handleDependentActions({
	'@@router/LOCATION_CHANGE': (state, action, {pattern}) => {
		return {x: 0, pattern};
	},
	'SCROLL_DEMO_X': (state, {payload}) => {
		return {...state, x: payload};
	}
}, {defaultValue: {x: 0}, dependencies: ['pattern']});
