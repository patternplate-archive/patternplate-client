'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var routes = {
	'path': './application/routes',
	'enabled': {
		'index': {
			'enabled': true,
			'path': '/'
		},
		'pattern': {
			'enabled': true,
			'path': '/pattern/:path+'
		},
		'demo': {
			'enabled': true,
			'path': '/demo/:path+'
		},
		'script': {
			'enabled': true,
			'path': '/script/:path+'
		},
		'style': {
			'enabled': true,
			'path': '/style/:path+'
		},
		'api': {
			'enabled': true,
			'path': '/api/:path+'
		} }
};

exports['default'] = routes;
module.exports = exports['default'];
