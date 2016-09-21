import {handleAction} from 'redux-actions';

export function getDepth(pathname) {
	const fragments = pathname.split('/').filter(Boolean);
	const fragmentIndex = fragments.indexOf('pattern');

	const index = fragmentIndex === -1 ?
		fragments.length :
		fragmentIndex;

	return fragments.slice(0, index).filter(Boolean).length;
}

export default handleAction('@@router/LOCATION_CHANGE', {
	next(_, {payload: {pathname}}) {
		return getDepth(pathname);
	}
}, '.');
