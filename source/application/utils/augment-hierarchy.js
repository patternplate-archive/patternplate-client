import {assign, merge} from 'lodash';

function hierarchyCompare(a, b) {
	return (a.order === b.order) ?
		a.displayName.localeCompare(b.displayName) :
		a.order > b.order;
}

function augmentFolderData(hierarchy) {
	// extract displayName and order from hierarchy config for the folder
	return folder => {
		const splits = folder.id.split('/');
		const key = splits[splits.length - 1];

		const defaultHierarchyEntry = {
			order: -1,
			displayName: key,
			icon: 'folder',
			iconActive: 'folder-open'
		};

		const hierarchyEntry = hierarchy[folder.id];

		return assign(
			{},
			folder,
			defaultHierarchyEntry,
			hierarchyEntry
		);
	};
}

const DEFAULT_ITEM = {
	manifest: {
		options: {}
	}
};

function augmentItemData() {
	return function augment(item) {
		const {manifest = {}} = item;
		const {options = {}} = manifest;
		const {hidden = false} = options;
		const displayName = manifest.displayName || manifest.name || item.name || item.id;
		return merge({}, DEFAULT_ITEM, item, {displayName}, {hidden});
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

	const folders = values
		.filter(item => item.type === 'folder')
		.map(augmentFolderData(hierarchy))
		.sort(hierarchyCompare);

	const items = values
		.filter(item => item.type !== 'folder')
		.map(augmentItemData(hierarchy))
		.sort(hierarchyCompare);

	return {
		folders,
		items
	};
}
