import {assign} from 'lodash';

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

function augmentPatternData() {
	return pattern => ({
		...pattern,
		displayName: pattern.manifest.displayName || pattern.manifest.name
	});
}

export function getPatterns(data, hierarchy) {
	return Object.values(data).reduce((pool, item) => {
		const amend = item.type === 'pattern' ? [item] : [];
		return [...pool, ...amend, ...getPatterns(item.children || {}, hierarchy)];
	}, []);
}

export default function getAugmentedChildren(data, hierarchy) {
	const folders = Object.values(data)
		.filter(item => item.type === 'folder')
		.map(augmentFolderData(hierarchy))
		.sort(hierarchyCompare);

	const patterns = Object.values(data)
		.filter(item => item.type === 'pattern')
		.map(augmentPatternData(hierarchy))
		.sort(hierarchyCompare);

	return {
		folders,
		patterns
	};
}
