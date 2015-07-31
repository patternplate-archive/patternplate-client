'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var ui = {
	'menuOrder': ['Atoms', 'Molecules', 'Polymers', 'Organisms', 'Ecospheres'],
	'resultOrder': ['Markup', 'Script', 'Style', 'Documentation'],
	'results': {
		'Documentation': {
			'use': 'buffer'
		},
		'Markup': {
			'use': 'buffer'
		},
		'Script': {
			'use': 'demoSource'
		},
		'Style': {
			'use': 'source'
		}
	},
	'fullscreenPatterns': [],
	'theme': 'light',
	'themeTarget': 'dark'
};

exports['default'] = ui;
module.exports = exports['default'];

// '^pages\/' // Strings containing regexes. do not use /regex/ syntax!