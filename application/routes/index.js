'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('isomorphic-fetch');

var _utilsHumanizeTree = require('../utils/humanize-tree');

var _utilsHumanizeTree2 = _interopRequireDefault(_utilsHumanizeTree);

var _reactRoutes = require('../react-routes');

var _reactRoutes2 = _interopRequireDefault(_reactRoutes);

var _layouts = require('../layouts');

var _layouts2 = _interopRequireDefault(_layouts);

function indexRouteFactory(application) {
	return function indexRoute() {
		var base, self, patternPath, data, response, navigationRoute, navigationResponse, iconsResponse, content, icons;
		return regeneratorRuntime.async(function indexRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					base = 'http://' + application.configuration.client.host + ':' + application.configuration.client.port + '' + application.configuration.client.path;
					self = 'http://' + application.configuration.server.host + ':' + application.configuration.server.port + '' + application.runtime.prefix;
					patternPath = this.params.path;
					data = {
						'schema': {},
						'navigation': {},
						'patterns': null,
						'config': application.configuration.ui
					};
					context$2$0.prev = 4;
					context$2$0.next = 7;
					return fetch(base);

				case 7:
					response = context$2$0.sent;
					context$2$0.next = 10;
					return response.json();

				case 10:
					data.schema = context$2$0.sent;
					context$2$0.next = 17;
					break;

				case 13:
					context$2$0.prev = 13;
					context$2$0.t9 = context$2$0['catch'](4);

					application.log.error('Could not fetch server schema from ' + base + '.');
					this['throw'](context$2$0.t9, 500);

				case 17:
					navigationRoute = data.schema.routes.filter(function (route) {
						return route.name === 'meta';
					})[0];
					navigationResponse = fetch(navigationRoute.uri);
					iconsResponse = fetch('' + self + 'static/images/inline-icons.svg');
					context$2$0.prev = 20;
					context$2$0.next = 23;
					return navigationResponse;

				case 23:
					navigationResponse = context$2$0.sent;
					context$2$0.next = 26;
					return navigationResponse.json();

				case 26:
					context$2$0.t10 = context$2$0.sent;
					data.navigation = _utilsHumanizeTree2['default'](context$2$0.t10);
					context$2$0.next = 34;
					break;

				case 30:
					context$2$0.prev = 30;
					context$2$0.t11 = context$2$0['catch'](20);

					application.log.error('Could not fetch navigation from ' + navigationRoute.uri);
					this['throw'](context$2$0.t11, 500);

				case 34:
					context$2$0.next = 36;
					return _reactRoutes2['default'](this.path, data);

				case 36:
					content = context$2$0.sent;
					context$2$0.next = 39;
					return iconsResponse;

				case 39:
					icons = context$2$0.sent;
					context$2$0.next = 42;
					return icons.text();

				case 42:
					icons = context$2$0.sent;

					this.body = _layouts2['default']({
						'title': data.schema.name,
						'data': JSON.stringify(data),
						'content': content,
						'script': '/script/index.js',
						'stylesheet': '/style/light.css',
						'icons': icons
					});

				case 44:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[4, 13], [20, 30]]);
	};
}

exports['default'] = indexRouteFactory;
module.exports = exports['default'];