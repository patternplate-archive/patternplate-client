import 'isomorphic-fetch';
import btoa from 'btoa';

import humanizeTree from '../utils/humanize-tree';
import router from '../react-routes';
import layout from '../layouts';

function indexRouteFactory ( application ) {
	return async function indexRoute () {
		let clientConfig = application.configuration.client;

		let base = `http://${clientConfig.host}:${clientConfig.port}${clientConfig.path}`;
		let self = `http://${application.configuration.server.host}:${application.configuration.server.port}${application.runtime.prefix}`;
		let messages = [];

		if (base === self) {
			messages.push({
				'type': 'warn',
				'content': `Client at ${self} will not execute api call against itself at ${base}.`
			});
			application.log.warn(`Client at ${self} will not execute api call against itself at ${base}. Check configurations "client" and "server".`);
		}

		let authHeader = this.headers.authorization;

		let selfHeaders = Object.assign({}, {
			'accept-type': 'application/json',
			'authorization': this.headers.authorization
		});

		if (clientConfig.credentials) {
			authHeader = 'Basic ' + btoa(`${clientConfig.credentials.name}:${clientConfig.credentials.pass}`);
		}

		let headers = Object.assign({}, {
			'accept-type': 'application/json',
			'authorization': authHeader
		});

		let data = {
			'schema': {},
			'navigation': {},
			'patterns': null,
			'config': application.configuration.ui
		};

		if (base !== self) {
			try {
				let response = await fetch(base, {headers});
				data.schema = await response.json();
				if (response.status >= 400) {
					this.throw(500, data.schema);
				}
			} catch(err) {
				application.log.error(`Could not fetch server schema from ${base}.`);
				messages.push({
					'type': 'error',
					'content': `Could not fetch server schema from ${base}: ${err}`
				});
			}
		}

		if (data.schema.routes) {
			let navigationRoute = data.schema.routes.filter((route) => route.name === 'meta')[0];

			if (!navigationRoute) {
				application.log.warn('Missing navigation route from server schema.');
				messages.push({
					'type': 'warn',
					'content': 'Missing navigation route from server schema.'
				});
			}

			if (navigationRoute) {
				let navigationResponse = fetch(navigationRoute.uri, {headers});
				try {
					navigationResponse = await navigationResponse;
					data.navigation = humanizeTree(await navigationResponse.json());

					if (navigationResponse.status >= 400) {
						this.throw(500, data.navigation);
					}
				} catch(err) {
					application.log.error(`Could not fetch navigation from ${navigationRoute.uri}`);
					messages.push({
						'type': 'error',
						'content': `Could not fetch navigation from ${navigationRoute.uri}: ${err}`
					});
				}
			}
		}

		data.messages = (data.messages || []).concat(messages);

		let iconsResponse = fetch(`${self}static/images/inline-icons.svg`, {'headers': selfHeaders});

		let content = await router(this.path, data);
		let icons = await iconsResponse;
		icons = await icons.text();

		this.body = layout({
			'title': data.schema.name || 'patternplate-client',
			'data': JSON.stringify(data),
			'content': content,
			'script': '/script/index.js',
			'stylesheet': '/style/light.css',
			'icons': icons
		});
	};
}

export default indexRouteFactory;
