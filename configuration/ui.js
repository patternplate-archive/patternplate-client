'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var ui = {
	'hierarchy': {
		// top level hierarchy

		'atoms': {
			'displayName': 'Atoms',
			'order': 1,
			'icon': 'atoms'
		},
		'molecules': {
			'displayName': 'Molecules',
			'order': 2,
			'icon': 'molecules'
		},
		'polymers': {
			'displayName': 'Polymers',
			'order': 3,
			'icon': 'polymers'
		},
		'organsims': {
			'displayName': 'Organisms',
			'order': 4,
			'icon': 'organsims'
		},
		'ecospheres': {
			'displayName': 'Ecospheres',
			'order': 5,
			'icon': 'ecospheres'
		},

		// other folder aliases

		'atoms/special-atoms': {
			'displayName': 'Specialized Atoms'
		}
	},
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