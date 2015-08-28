const ui = {
	'hierarchy': {
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
		'organisms': {
			'displayName': 'Organisms',
			'order': 4,
			'icon': 'organisms'
		},
		'ecospheres': {
			'displayName': 'Ecospheres',
			'order': 5,
			'icon': 'ecospheres'
		},
		'atoms/special-atoms': {
			'displayName': 'Specialized Atoms'
		}
	},
	'resultOrder': [
    'Dependencies',
		'Markup',
		'Script',
		'Style',
		'Documentation'
	],
	'results': {
    'Dependencies': {
      'use': 'source'
    },
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
	'themeTarget': 'dark',
	'useFolderTable': false

};

export default ui;
