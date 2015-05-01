import request from 'request-promise';

import humanizeTree from '../utils/humanize-tree';
import router from '../react-routes';
import layout from '../layouts';

function indexRouteFactory (application) {
	const config = application.configuration.client;
	let base = `http://${config.server}:${config.port}`;

	return async function indexRoute () {
		let data = {
			'schema': {},
			'navigation': {}
		};

		try {
			data.schema = JSON.parse(await request(base));
		} catch(err) {
			application.log.error(`Could not fetch server schema from ${base}.`);
		}

		let navigationRoute = data.schema.routes.filter((route) => route.name === 'meta')[0];

		try {
			data.navigation = humanizeTree(JSON.parse(await request(navigationRoute.uri)));
		} catch(err) {
			application.log.error(`Could not fetch navigation from ${navigationRoute.uri}.`);
		}

		let content = await router(this.path, data);

		this.body = layout({
			'title': data.schema.name,
			'data': JSON.stringify(data),
			'content': content,
			'script': '/script/index.js'
		});
	};
}

export default indexRouteFactory;
