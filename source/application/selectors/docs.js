import {merge} from 'lodash';
import {createSelector} from 'reselect';
import {flatten, sanitize} from './tree';

const docs = createSelector(
	state => state.schema.docs,
	state => state.id,
	state => state.hide,
	(tree, id, hide) => {
		const t = merge({}, tree);

		if (!t.children.some(i => i.id === 'root')) {
			tree.children.push({
				contents: tree.contents,
				href: '/',
				id: tree.id,
				manifest: tree.manifest,
				path: ['/'],
				type: 'doc'
			});
		}

		return sanitize(t, {hide, id, prefix: 'doc'});
	}
);

export default docs;
export const flat = createSelector(docs, flatten);
