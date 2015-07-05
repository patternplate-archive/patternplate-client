'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('isomorphic-fetch');

var _btoa = require('btoa');

var _btoa2 = _interopRequireDefault(_btoa);

var _utilsHumanizeTree = require('../utils/humanize-tree');

var _utilsHumanizeTree2 = _interopRequireDefault(_utilsHumanizeTree);

var _reactRoutes = require('../react-routes');

var _reactRoutes2 = _interopRequireDefault(_reactRoutes);

var _layouts = require('../layouts');

var _layouts2 = _interopRequireDefault(_layouts);

function indexRouteFactory(application) {
	return function indexRoute() {
		var clientConfig, base, self, messages, authHeader, selfHeaders, headers, data, response, navigationRoute, navigationResponse, iconsResponse, content, icons;
		return regeneratorRuntime.async(function indexRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					clientConfig = application.configuration.client;
					base = 'http://' + clientConfig.host + ':' + clientConfig.port + clientConfig.path;
					self = 'http://' + application.configuration.server.host + ':' + application.configuration.server.port + application.runtime.prefix;
					messages = [];

					if (base === self) {
						messages.push({
							'type': 'warn',
							'content': 'Client at ' + self + ' will not execute api call against itself at ' + base + '.'
						});
						application.log.warn('Client at ' + self + ' will not execute api call against itself at ' + base + '. Check configurations "client" and "server".');
					}

					authHeader = this.headers.authorization;
					selfHeaders = Object.assign({}, {
						'accept-type': 'application/json',
						'authorization': this.headers.authorization
					});

					if (clientConfig.credentials) {
						authHeader = 'Basic ' + (0, _btoa2['default'])(clientConfig.credentials.name + ':' + clientConfig.credentials.pass);
					}

					headers = Object.assign({}, {
						'accept-type': 'application/json',
						'authorization': authHeader
					});
					data = {
						'schema': {},
						'navigation': {},
						'patterns': null,
						'config': application.configuration.ui
					};

					if (!(base !== self)) {
						context$2$0.next = 25;
						break;
					}

					context$2$0.prev = 11;
					context$2$0.next = 14;
					return regeneratorRuntime.awrap(fetch(base, { headers: headers }));

				case 14:
					response = context$2$0.sent;
					context$2$0.next = 17;
					return regeneratorRuntime.awrap(response.json());

				case 17:
					data.schema = context$2$0.sent;

					if (response.status >= 400) {
						this['throw'](500, data.schema);
					}
					context$2$0.next = 25;
					break;

				case 21:
					context$2$0.prev = 21;
					context$2$0.t0 = context$2$0['catch'](11);

					application.log.error('Could not fetch server schema from ' + base + '.');
					messages.push({
						'type': 'error',
						'content': 'Could not fetch server schema from ' + base + ': ' + context$2$0.t0
					});

				case 25:
					if (!data.schema.routes) {
						context$2$0.next = 45;
						break;
					}

					navigationRoute = data.schema.routes.filter(function (route) {
						return route.name === 'meta';
					})[0];

					if (!navigationRoute) {
						application.log.warn('Missing navigation route from server schema.');
						messages.push({
							'type': 'warn',
							'content': 'Missing navigation route from server schema.'
						});
					}

					if (!navigationRoute) {
						context$2$0.next = 45;
						break;
					}

					navigationResponse = fetch(navigationRoute.uri, { headers: headers });
					context$2$0.prev = 30;
					context$2$0.next = 33;
					return regeneratorRuntime.awrap(navigationResponse);

				case 33:
					navigationResponse = context$2$0.sent;
					context$2$0.next = 36;
					return regeneratorRuntime.awrap(navigationResponse.json());

				case 36:
					context$2$0.t1 = context$2$0.sent;
					data.navigation = (0, _utilsHumanizeTree2['default'])(context$2$0.t1);

					if (navigationResponse.status >= 400) {
						this['throw'](500, data.navigation);
					}
					context$2$0.next = 45;
					break;

				case 41:
					context$2$0.prev = 41;
					context$2$0.t2 = context$2$0['catch'](30);

					application.log.error('Could not fetch navigation from ' + navigationRoute.uri);
					messages.push({
						'type': 'error',
						'content': 'Could not fetch navigation from ' + navigationRoute.uri + ': ' + context$2$0.t2
					});

				case 45:

					data.messages = (data.messages || []).concat(messages);

					iconsResponse = fetch(self + 'static/images/inline-icons.svg', { 'headers': selfHeaders });
					context$2$0.next = 49;
					return regeneratorRuntime.awrap((0, _reactRoutes2['default'])(this.path, data));

				case 49:
					content = context$2$0.sent;
					context$2$0.next = 52;
					return regeneratorRuntime.awrap(iconsResponse);

				case 52:
					icons = context$2$0.sent;
					context$2$0.next = 55;
					return regeneratorRuntime.awrap(icons.text());

				case 55:
					icons = context$2$0.sent;

					this.body = (0, _layouts2['default'])({
						'title': data.schema.name || 'patternplate-client',
						'data': JSON.stringify(data),
						'content': content,
						'script': '/script/index.js',
						'stylesheet': '/style/light.css',
						'icons': icons
					});

				case 57:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[11, 21], [30, 41]]);
	};
}

exports['default'] = indexRouteFactory;
module.exports = exports['default'];