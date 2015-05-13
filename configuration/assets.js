'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var assets = {
	'browserify': {
		'transforms': {
			'babelify': {
				'enabled': true,
				'opts': {
					'stage': 0,
					'optional': ['runtime']
				}
			},
			'uglifyify': {
				'enabled': false,
				'opts': {
					'global': true
				}
			}
		}
	},
	'less': {}
};

exports['default'] = assets;
module.exports = exports['default'];