import {createSelector} from 'reselect';
import urlQuery from '../utils/url-query';
import selectItem from './item';

const selectEnv = createSelector(
	state => state.environment,
	state => state.schema.envs,
	(env, envs) => envs.find(e => e.name === env)
);

export const selectSrc = createSelector(
	selectItem,
	state => state.base,
	selectEnv,
	state => state.pattern,
	(item, base, env, pattern) => {
		if (!item) {
			return null;
		}
		const pathname = urlQuery.format({
			pathname: `${base}demo/${item.id}/index.html`,
			query: {environment: env.name}
		});

		return `${pathname}?reload-time=${pattern.reloadTime}`;
	}
);
