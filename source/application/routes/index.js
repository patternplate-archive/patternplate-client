import fetch from 'isomorphic-fetch';
import btoa from 'btoa';
import cookie from 'cookie';

import router from '../react-routes';
import layout from '../layouts';

function indexRouteFactory(application) {
	return async function indexRoute() {
		const clientConfig = application.configuration.client;

		const base = `http://${clientConfig.host}:${clientConfig.port}${clientConfig.path}`;
		const self = `http://${application.configuration.server.host}:${application.configuration.server.port}${application.runtime.prefix}`;
		const messages = [];

		if (base === self) {
			messages.push({
				type: 'warn',
				content: `Client at ${self} will not execute api call against itself at ${base}.`
			});
			application.log.warn(`Client at ${self} will not execute api call against itself at ${base}. Check configurations "client" and "server".`);
		}

		let authHeader = this.headers.authorization;

		const selfHeaders = Object.assign({}, {
			'accept-type': 'application/json',
			'authorization': this.headers.authorization
		});

		if (clientConfig.credentials) {
			const auth = btoa(
				`${clientConfig.credentials.name}:${clientConfig.credentials.pass}`
			);
			authHeader = `Basic ${auth}`;
		}

		const headers = Object.assign({}, {
			'accept-type': 'application/json',
			'authorization': authHeader
		});

		const passedConfig = Object.assign({}, application.configuration.ui);
		const cookieData = decodeURIComponent(this.cookies.get('patternplate-client'));

		if (cookie) {
			try {
				const cookieJSON = JSON.parse(cookieData);
				Object.assign(passedConfig, cookieJSON);
				application.log.silly('read cookie data', JSON.stringify(cookieJSON));
			} catch (err) {
				application.log.warn('Failed reading cookie');
			}
		}

		const data = {
			schema: {},
			navigation: {},
			patterns: null,
			config: passedConfig
		};

		if (base !== self) {
			try {
				const response = await fetch(base, {headers});
				data.schema = await response.json();
				if (response.status >= 400) {
					this.throw(500, data.schema);
				}
			} catch (err) {
				application.log.error(`Could not fetch server schema from ${base}.`);
				messages.push({
					type: 'error',
					content: `Could not fetch server schema from ${base}: ${err}`
				});
			}
		}

		if (data.schema.routes) {
			const [navigationRoute] = data.schema.routes
				.filter(route => route.name === 'meta');

			if (!navigationRoute) {
				application.log.warn('Missing navigation route from server schema.');
				messages.push({
					type: 'warn',
					content: 'Missing navigation route from server schema.'
				});
			}

			if (navigationRoute) {
				let navigationResponse = fetch(navigationRoute.uri, {headers});
				try {
					navigationResponse = await navigationResponse;
					data.navigation = await navigationResponse.json();

					if (navigationResponse.status >= 400) {
						this.throw(500, data.navigation);
					}
				} catch (err) {
					application.log.error(`Could not fetch navigation from ${navigationRoute.uri}`);
					messages.push({
						type: 'error',
						content: `Could not fetch navigation from ${navigationRoute.uri}: ${err}`
					});
				}
			}
		}

		data.messages = (data.messages || []).concat(messages);

		const iconsResponse = fetch(
			`${self}static/images/inline-icons.svg`, {headers: selfHeaders}
		);

		const content = await router(this.request.url, data);
		const icons = await (await iconsResponse).text();

		this.body = layout({
			title: data.schema.name || 'patternplate-client',
			data: JSON.stringify(data),
			content,
			script: '/script/index.bundle.js',
			stylesheet: `/style/${data.config.theme}.css`,
			icons
		});
	};
}

export default indexRouteFactory;
