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
		var base, self, headers, patternPath, data, response, navigationRoute, navigationResponse, iconsResponse, content, icons;
		return regeneratorRuntime.async(function indexRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					base = 'http://' + application.configuration.client.host + ':' + application.configuration.client.port + application.configuration.client.path;
					self = 'http://' + application.configuration.server.host + ':' + application.configuration.server.port + application.runtime.prefix;
					headers = {
						'accept-type': 'application/json',
						'authorization': this.request.header.authorization
					};
					patternPath = this.params.path;
					data = {
						'schema': {},
						'navigation': {},
						'patterns': null,
						'config': application.configuration.ui
					};
					context$2$0.prev = 5;
					context$2$0.next = 8;
					return regeneratorRuntime.awrap(fetch(base, { headers: headers }));

				case 8:
					response = context$2$0.sent;
					context$2$0.next = 11;
					return regeneratorRuntime.awrap(response.json());

				case 11:
					data.schema = context$2$0.sent;

					if (response.status >= 400) {
						this['throw'](500, data.schema);
					}
					context$2$0.next = 20;
					break;

				case 15:
					context$2$0.prev = 15;
					context$2$0.t0 = context$2$0['catch'](5);

					application.log.error('Could not fetch server schema from ' + base + '.');
					this['throw'](context$2$0.t0, 500);
					return context$2$0.abrupt('return');

				case 20:
					navigationRoute = data.schema.routes.filter(function (route) {
						return route.name === 'meta';
					})[0];
					navigationResponse = fetch(navigationRoute.uri, { headers: headers });
					iconsResponse = fetch(self + 'static/images/inline-icons.svg', { headers: headers });
					context$2$0.prev = 23;
					context$2$0.next = 26;
					return regeneratorRuntime.awrap(navigationResponse);

				case 26:
					navigationResponse = context$2$0.sent;
					context$2$0.next = 29;
					return regeneratorRuntime.awrap(navigationResponse.json());

				case 29:
					context$2$0.t1 = context$2$0.sent;
					data.navigation = (0, _utilsHumanizeTree2['default'])(context$2$0.t1);

					if (navigationResponse.status >= 400) {
						this['throw'](500, data.navigation);
					}
					context$2$0.next = 38;
					break;

				case 34:
					context$2$0.prev = 34;
					context$2$0.t2 = context$2$0['catch'](23);

					application.log.error('Could not fetch navigation from ' + navigationRoute.uri);
					this['throw'](context$2$0.t2, 500);

				case 38:
					context$2$0.next = 40;
					return regeneratorRuntime.awrap((0, _reactRoutes2['default'])(this.path, data));

				case 40:
					content = context$2$0.sent;
					context$2$0.next = 43;
					return regeneratorRuntime.awrap(iconsResponse);

				case 43:
					icons = context$2$0.sent;
					context$2$0.next = 46;
					return regeneratorRuntime.awrap(icons.text());

				case 46:
					icons = context$2$0.sent;

					this.body = (0, _layouts2['default'])({
						'title': data.schema.name,
						'data': JSON.stringify(data),
						'content': content,
						'script': '/script/index.js',
						'stylesheet': '/style/light.css',
						'icons': icons
					});

				case 48:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[5, 15], [23, 34]]);
	};
}

exports['default'] = indexRouteFactory;
module.exports = exports['default'];