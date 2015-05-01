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
		}
	}
};

export default routes;
