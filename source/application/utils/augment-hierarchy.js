import {merge} from 'lodash';

function hierarchyCompare(a, b) {
	return (a.order === b.order) ?
		a.displayName.localeCompare(b.displayName) :
		a.order > b.order;
}

const DEFAULT_ITEM = {
	manifest: {
		options: {}
	}
};

export function augmentItemData(hierarchy = {}) {
	return function augment(item) {
		const entry = hierarchy[item.id];

		const {manifest = {}} = item;
		const {options = {}} = manifest;
		const {hidden = false} = options;
		const displayName = manifest.displayName || manifest.name || item.name || item.id;
		const order = manifest.order || -1;
		const icon = manifest.icon || item.type;
		const iconActive = manifest.iconActive || `${icon}-active`;

		return merge({}, DEFAULT_ITEM, item, {order, hidden, displayName, icon, iconActive}, entry);
	};
}

export function getPatterns(data, hierarchy) {
	return Object.values(data).reduce((pool, item) => {
		const amend = item.type === 'pattern' ? [item] : [];
		return [...pool, ...amend, ...getPatterns(item.children || {}, hierarchy)];
	}, []);
}

export default function getAugmentedChildren(data, hierarchy) {
	const values = Array.isArray(data) ? data : Object.values(data);

	return values
		.map(augmentItemData(hierarchy))
		.sort(hierarchyCompare);
}
