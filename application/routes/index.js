'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('isomorphic-fetch');

var _btoa = require('btoa');

var _btoa2 = _interopRequireDefault(_btoa);

var _cookie = require('cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _utilsHumanizeTree = require('../utils/humanize-tree');

var _utilsHumanizeTree2 = _interopRequireDefault(_utilsHumanizeTree);

var _reactRoutes = require('../react-routes');

var _reactRoutes2 = _interopRequireDefault(_reactRoutes);

var _layouts = require('../layouts');

var _layouts2 = _interopRequireDefault(_layouts);

function indexRouteFactory(application) {
	return function indexRoute() {
		var clientConfig, base, self, messages, authHeader, selfHeaders, headers, passedConfig, cookieData, cookieJSON, data, response, navigationRoute, navigationResponse, iconsResponse, content, icons;
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
					passedConfig = Object.assign({}, application.configuration.ui);
					cookieData = decodeURIComponent(this.cookies.get('patternplate-client'));

					if (_cookie2['default']) {
						try {
							cookieJSON = JSON.parse(cookieData);

							Object.assign(passedConfig, cookieJSON);
							application.log.silly('read cookie data', JSON.stringify(cookieJSON));
						} catch (err) {
							application.log.warn('Failed reading cookie');
						}
					}

					data = {
						'schema': {},
						'navigation': {},
						'patterns': null,
						'config': passedConfig
					};

					if (!(base !== self)) {
						context$2$0.next = 28;
						break;
					}

					context$2$0.prev = 14;
					context$2$0.next = 17;
					return regeneratorRuntime.awrap(fetch(base, { headers: headers }));

				case 17:
					response = context$2$0.sent;
					context$2$0.next = 20;
					return regeneratorRuntime.awrap(response.json());

				case 20:
					data.schema = context$2$0.sent;

					if (response.status >= 400) {
						this['throw'](500, data.schema);
					}
					context$2$0.next = 28;
					break;

				case 24:
					context$2$0.prev = 24;
					context$2$0.t0 = context$2$0['catch'](14);

					application.log.error('Could not fetch server schema from ' + base + '.');
					messages.push({
						'type': 'error',
						'content': 'Could not fetch server schema from ' + base + ': ' + context$2$0.t0
					});

				case 28:
					if (!data.schema.routes) {
						context$2$0.next = 48;
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
						context$2$0.next = 48;
						break;
					}

					navigationResponse = fetch(navigationRoute.uri, { headers: headers });
					context$2$0.prev = 33;
					context$2$0.next = 36;
					return regeneratorRuntime.awrap(navigationResponse);

				case 36:
					navigationResponse = context$2$0.sent;
					context$2$0.next = 39;
					return regeneratorRuntime.awrap(navigationResponse.json());

				case 39:
					context$2$0.t1 = context$2$0.sent;
					data.navigation = (0, _utilsHumanizeTree2['default'])(context$2$0.t1);

					if (navigationResponse.status >= 400) {
						this['throw'](500, data.navigation);
					}
					context$2$0.next = 48;
					break;

				case 44:
					context$2$0.prev = 44;
					context$2$0.t2 = context$2$0['catch'](33);

					application.log.error('Could not fetch navigation from ' + navigationRoute.uri);
					messages.push({
						'type': 'error',
						'content': 'Could not fetch navigation from ' + navigationRoute.uri + ': ' + context$2$0.t2
					});

				case 48:

					data.messages = (data.messages || []).concat(messages);

					iconsResponse = fetch(self + 'static/images/inline-icons.svg', { 'headers': selfHeaders });
					context$2$0.next = 52;
					return regeneratorRuntime.awrap((0, _reactRoutes2['default'])(this.path, data));

				case 52:
					content = context$2$0.sent;
					context$2$0.next = 55;
					return regeneratorRuntime.awrap(iconsResponse);

				case 55:
					icons = context$2$0.sent;
					context$2$0.next = 58;
					return regeneratorRuntime.awrap(icons.text());

				case 58:
					icons = context$2$0.sent;

					this.body = (0, _layouts2['default'])({
						'title': data.schema.name || 'patternplate-client',
						'data': JSON.stringify(data),
						'content': content,
						'script': '/script/index.js',
						'stylesheet': '/style/' + data.config.theme + '.css',
						'icons': icons
					});

				case 60:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[14, 24], [33, 44]]);
	};
}

exports['default'] = indexRouteFactory;
module.exports = exports['default'];