const routes = {
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
			'path': '/api/:path?*'
		},
		'static': {
			'enabled': true,
			'path': '/static/:path+'
		}
	}
};

export default routes;
