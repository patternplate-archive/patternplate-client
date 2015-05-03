const routes = {
	'path': './application/routes',
	'enabled': {
		'index': {
			'path': '/'
		},
		'pattern': {
			'enabled': true,
			'path': '/pattern/*'
		},
		'api': {
			'enabled': true,
			'path': '/api/*'
		},
		'demo': {
			'enabled': true,
			'path': '/demo/*'
		},
		'script': {
			'enabled': true,
			'path': '/script/*'
		},
		'style': {
			'enabled': true,
			'path': '/style/*'
		}
	}
};

export default routes;
