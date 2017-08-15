import {createSelector} from 'reselect';
import urlQuery from '../utils/url-query';
import selectItem from './item';

export const selectSrc = createSelector(
	selectItem,
	state => state.base,
	state => state.env,
	(item, base, env) => {
		if (!item) {
			return null;
		}

		const pathname = urlQuery.format({
			pathname: `${base}demo/${item.id}/index.html`,
			query: {environment: env}
		});

		return `${pathname}?reload-time=${item.reloadTime}`;
	}
);
