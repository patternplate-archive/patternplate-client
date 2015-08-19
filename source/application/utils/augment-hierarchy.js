
function hierarchyCompare (a, b) {
	return (a.order == b.order) ?
		a.displayName.localeCompare(b.displayName) :
		a.order > b.order;
}

function augmentFolderData(hierarchy) {
	// extract displayName and order from hierarchy config for the folder
	return folder => {
		let splits = folder.id.split('/');
		let key = splits[splits.length - 1];

		let defaultHierarchyEntry = {
			'order': -1, // default order is -1, hence 'unordered' items are on top
			'displayName': key,
			'icon': 'folder' // TODO: add 'folder' default icon
		};

		let hierarchyEntry = hierarchy[folder.id];

		return {
			...folder,
			...defaultHierarchyEntry,
			...hierarchyEntry
		};
	};
}

function augmentPatternData (hierarchy) {
	return pattern => ({
		...pattern,
		displayName: pattern.manifest.displayName || pattern.manifest.name
	});
}

export default function getAugmentedChildren (data, hierarchy) {
	let folders = [];
	let patterns = [];

	Object.keys(data).forEach(childKey => {
		let child = data[childKey];

		if ( child.type == 'pattern' ) {
			patterns.push(child);
		} else if (child.type == 'folder') {
			folders.push(child);
		} else {
			console.warn('Unknown meta hierarchy type "' + child.type + '", skipping.');
		}
	});

	folders = folders.map(augmentFolderData(hierarchy));
	folders.sort(hierarchyCompare);

	patterns = patterns.map(augmentPatternData(hierarchy));
	patterns.sort(hierarchyCompare);

	return {
		folders,
		patterns
	};
}

