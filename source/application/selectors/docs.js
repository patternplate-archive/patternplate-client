import {createSelector} from 'reselect';
import {enrich, flatten, sanitize} from './tree';

const docs = createSelector(
	state => state.schema.docs,
	state => state.id,
	state => state.hide,
	(tree, id, hide) => {
		const t = sanitize(tree, {hide, id, prefix: 'doc'});

		if (!t.children.some(i => i.id === 'root')) {
			const doc = enrich({
				contents: tree.contents,
				href: '/',
				id: tree.id,
				manifest: tree.manifest,
				path: ['/'],
				type: 'doc'
			}, {id, config: {}, prefix: '/'});

			tree.children.push(doc);
		}

		return t;
	}
);

export default docs;
export const flat = createSelector(docs, flatten);
