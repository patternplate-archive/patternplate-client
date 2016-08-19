const routes = {
	path: [
		'application/routes',
		'application/patternplate-client/routes'
	],
	enabled: {
		index: {
			enabled: true,
			path: '/'
		},
		pattern: {
			enabled: true,
			path: '/pattern/:path+'
		},
		demo: {
			enabled: true,
			path: '/demo/:id+'
		},
		script: {
			enabled: true,
			path: '/script/:path+'
		},
		style: {
			enabled: true,
			path: '/style/:path+'
		},
		static: {
			enabled: true,
			path: '/static/:path+'
		}
	}
};

export default routes;
