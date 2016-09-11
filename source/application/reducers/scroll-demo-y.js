import handleDependentActions from '../actions/handle-dependent-actions';

export default handleDependentActions({
	'@@router/LOCATION_CHANGE': (state, action, {pattern}) => {
		return {y: 0, pattern};
	},
	'SCROLL_DEMO_Y': (state, {payload}) => {
		return {...state, y: payload};
	}
}, {defaultValue: {y: 0}, dependencies: ['pattern']});
