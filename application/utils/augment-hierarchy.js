'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = getAugmentedChildren;

function hierarchyCompare(a, b) {
	return a.order == b.order ? a.displayName.localeCompare(b.displayName) : a.order > b.order;
}

function augmentFolderData(hierarchy) {
	// extract displayName and order from hierarchy config for the folder
	return function (folder) {
		var splits = folder.id.split('/');
		var key = splits[splits.length - 1];

		var defaultHierarchyEntry = {
			'order': -1, // default order is -1, hence 'unordered' items are on top
			'displayName': key,
			'icon': 'folder' // TODO: add 'folder' default icon
		};

		var hierarchyEntry = hierarchy[folder.id];

		return _extends({}, folder, defaultHierarchyEntry, hierarchyEntry);
	};
}

function augmentPatternData(hierarchy) {
	return function (pattern) {
		return _extends({}, pattern, {
			displayName: pattern.manifest.displayName || pattern.manifest.name
		});
	};
}

function getAugmentedChildren(data, hierarchy) {
	var folders = [];
	var patterns = [];

	Object.keys(data).forEach(function (childKey) {
		var child = data[childKey];

		if (child.type == 'pattern') {
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
		folders: folders,
		patterns: patterns
	};
}

module.exports = exports['default'];