import 'isomorphic-fetch';

import humanizeTree from '../utils/humanize-tree';
import router from '../react-routes';
import layout from '../layouts';

function indexRouteFactory ( application ) {
	return async function indexRoute () {
		let base = `http://${application.configuration.client.host}:${application.configuration.client.port}${application.configuration.client.path}`;
		let self = `http://${application.configuration.server.host}:${application.configuration.server.port}${application.runtime.prefix}`;

		let patternPath = this.params.path;

		let data = {
			'schema': {},
			'navigation': {},
			'patterns': null,
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
		let patternRoute = data.schema.routes.filter((route) => route.name === 'pattern')[0];

		let navigationResponse = fetch(navigationRoute.uri);
		let iconsResponse = fetch(`${self}static/images/inline-icons.svg`);

		if (patternPath) {
			let patternBase = base[base.length] === '/' ? base : `${base}/`;
			var patternResponse = fetch(`${patternBase}pattern/${patternPath}`);
		}

		try {
			navigationResponse = await navigationResponse;
			data.navigation = humanizeTree(await navigationResponse.json());

		} catch(err) {
			application.log.error(`Could not fetch navigation from ${navigationRoute.uri}`);
			this.throw(err, 500);
		}

		if (patternPath) {
			try{
				patternResponse = await patternResponse;
				let patterns = await patternResponse.json();
				data.patterns = Array.isArray(patterns) ? patterns : [patterns];
			} catch(err) {
				application.log.error(`Could not fetch initial data from ${base}pattern/${patternPath}`);
				application.log.error(err);
			}
		}

		let content = await router(this.path, data);

		let icons = await iconsResponse;
		icons = await icons.text();

		this.body = layout({
			'title': data.schema.name,
			'data': JSON.stringify(data),
			'content': content,
			'script': '/script/index.js',
			'stylesheet': '/style/light.css',
			'icons': icons
		});
	};
}

export default indexRouteFactory;
