import url from 'url';
import {handleAction} from 'redux-actions';

export function getDepth(pathname) {
	const parsed = url.parse(pathname);
	return parsed.pathname.split('/').filter(Boolean).length;
}

export default handleAction('@@router/LOCATION_CHANGE', {
	next(_, {payload: {pathname}}) {
		return getDepth(pathname);
	}
}, '.');
