const routes = {
	enabled: {
		'index': {
			enabled: true,
			// Match
			// - /
			// - Everything starting with /, except /static and /api
			path: /(\/$|^\/(?!static|api)(?:.*))/
		},
		'static': {
			enabled: true,
			path: '/static/:path+'
		}
	}
};

export default routes;
