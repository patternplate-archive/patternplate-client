const ui = {
	'menuOrder': [
		'Atoms',
		'Molecules',
		'Polymers',
		'Organisms',
		'Ecospheres'
	],
	'resultOrder': [
		'Markup',
		'Script',
		'Style',
		'Documentation'
	],
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
	'fullscreenPatterns': [
		// '^pages\/' // Strings containing regexes. do not use /regex/ syntax!
	],
	'theme': 'light',
	'themeTarget': 'dark'
};

export default ui;
