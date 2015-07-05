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
		var clientConfig, base, self, authHeader, headers, data, response, navigationRoute, navigationResponse, iconsResponse, content, icons;
		return regeneratorRuntime.async(function indexRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					clientConfig = application.configuration.client;
					base = 'http://' + clientConfig.host + ':' + clientConfig.port + clientConfig.path;
					self = 'http://' + application.configuration.server.host + ':' + application.configuration.server.port + application.runtime.prefix;
					authHeader = this.headers.authorization;

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
					context$2$0.prev = 7;
					context$2$0.next = 10;
					return regeneratorRuntime.awrap(fetch(base, { headers: headers }));

				case 10:
					response = context$2$0.sent;
					context$2$0.next = 13;
					return regeneratorRuntime.awrap(response.json());

				case 13:
					data.schema = context$2$0.sent;

					if (response.status >= 400) {
						this['throw'](500, data.schema);
					}
					context$2$0.next = 22;
					break;

				case 17:
					context$2$0.prev = 17;
					context$2$0.t0 = context$2$0['catch'](7);

					application.log.error('Could not fetch server schema from ' + base + '.');
					this['throw'](context$2$0.t0, 500);
					return context$2$0.abrupt('return');

				case 22:
					navigationRoute = data.schema.routes.filter(function (route) {
						return route.name === 'meta';
					})[0];
					navigationResponse = fetch(navigationRoute.uri, { headers: headers });
					iconsResponse = fetch(self + 'static/images/inline-icons.svg', { headers: headers });
					context$2$0.prev = 25;
					context$2$0.next = 28;
					return regeneratorRuntime.awrap(navigationResponse);

				case 28:
					navigationResponse = context$2$0.sent;
					context$2$0.next = 31;
					return regeneratorRuntime.awrap(navigationResponse.json());

				case 31:
					context$2$0.t1 = context$2$0.sent;
					data.navigation = (0, _utilsHumanizeTree2['default'])(context$2$0.t1);

					if (navigationResponse.status >= 400) {
						this['throw'](500, data.navigation);
					}
					context$2$0.next = 40;
					break;

				case 36:
					context$2$0.prev = 36;
					context$2$0.t2 = context$2$0['catch'](25);

					application.log.error('Could not fetch navigation from ' + navigationRoute.uri);
					this['throw'](context$2$0.t2, 500);

				case 40:
					context$2$0.next = 42;
					return regeneratorRuntime.awrap((0, _reactRoutes2['default'])(this.path, data));

				case 42:
					content = context$2$0.sent;
					context$2$0.next = 45;
					return regeneratorRuntime.awrap(iconsResponse);

				case 45:
					icons = context$2$0.sent;
					context$2$0.next = 48;
					return regeneratorRuntime.awrap(icons.text());

				case 48:
					icons = context$2$0.sent;

					this.body = (0, _layouts2['default'])({
						'title': data.schema.name,
						'data': JSON.stringify(data),
						'content': content,
						'script': '/script/index.js',
						'stylesheet': '/style/light.css',
						'icons': icons
					});

				case 50:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[7, 17], [25, 36]]);
	};
}

exports['default'] = indexRouteFactory;
module.exports = exports['default'];