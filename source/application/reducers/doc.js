import getIdByPathname from '../utils/get-id-by-pathname';
import handleDependentActions from '../actions/handle-dependent-actions';

function handler(_, {payload}, {base}) {
	const id = getIdByPathname(payload.pathname, base);
	return id.split('/').filter(Boolean).slice(2).join('/');
}

export default handleDependentActions({
	'@@router/LOCATION_CHANGE': handler
}, {
	dependencies: ['base']
});
