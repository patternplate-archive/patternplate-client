import {createSelector} from 'reselect';
import {flat as selectDocs} from '../selectors/docs';
import {flat as selectNavigation} from '../selectors/navigation';

export default createSelector(
	selectDocs,
	selectNavigation,
	(docs, nav) => {
		Array.prototype.push.apply(docs, nav);
		return docs;
	}
);
