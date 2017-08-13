import {createSelector} from 'reselect';
import selectPool from './pool';

const REGISTRY = {
	'/': 'doc/root'
};

const item = createSelector(
	selectPool,
	state => state.id,
	(pool, id) => {
		const search = id in REGISTRY ? REGISTRY[id] : id;
		return pool.find(item => search === `${item.type}/${item.id}`);
	}
);

export default item;
