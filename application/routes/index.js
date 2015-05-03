import 'isomorphic-fetch';

import humanizeTree from '../utils/humanize-tree';
import router from '../react-routes';
import layout from '../layouts';

function indexRouteFactory (application) {
	const config = application.configuration.client;
	let base = `http://${config.server}:${config.port}`;

	return async function indexRoute () {
		let data = {
			'schema': {},
			'navigation': {},
			'config': application.configuration.ui
		};

		try {
			let response = await fetch(base);
			data.schema = await response.json();
		} catch(err) {
			application.log.error(`Could not fetch server schema from ${base}.`);
			this.throw(err, 500);
		}

		let navigationRoute = data.schema.routes.filter((route) => route.name === 'meta')[0];

		try {
			let response = await fetch(navigationRoute.uri);
			data.navigation = humanizeTree(await response.json());
		} catch(err) {
			application.log.error(`Could not fetch navigation from ${navigationRoute.uri}.`);
			this.throw(err, 500);
		}

		let content = await router(this.path, data);

		this.body = layout({
			'title': data.schema.name,
			'data': JSON.stringify(data),
			'content': content,
			'script': '/script/index.js',
			'stylesheet': '/style/light.css'
		});
	};
}

export default indexRouteFactory;
