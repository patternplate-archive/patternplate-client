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
	var config = application.configuration.client;
	var base = 'http://' + config.server + ':' + config.port;

	return function indexRoute() {
		var data, response, navigationRoute, patternRoute, patternPath, navigationResponse, iconsResponse, patternResponse, patterns, content, icons;
		return regeneratorRuntime.async(function indexRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					data = {
						'schema': {},
						'navigation': {},
						'patterns': null,
						'config': application.configuration.ui
					};
					context$2$0.prev = 1;
					context$2$0.next = 4;
					return fetch(base);

				case 4:
					response = context$2$0.sent;
					context$2$0.next = 7;
					return response.json();

				case 7:
					data.schema = context$2$0.sent;
					context$2$0.next = 14;
					break;

				case 10:
					context$2$0.prev = 10;
					context$2$0.t5 = context$2$0['catch'](1);

					application.log.error('Could not fetch server schema from ' + base + '.');
					this['throw'](context$2$0.t5, 500);

				case 14:
					navigationRoute = data.schema.routes.filter(function (route) {
						return route.name === 'meta';
					})[0];
					patternRoute = data.schema.routes.filter(function (route) {
						return route.name === 'pattern';
					})[0];
					patternPath = this.params[0] ? this.params[0].value : null;
					navigationResponse = fetch(navigationRoute.uri);
					iconsResponse = fetch('http://' + application.configuration.server.host + ':' + application.configuration.server.port + '/static/images/inline-icons.svg');

					if (patternPath) {
						patternResponse = fetch('' + base + '/pattern/' + patternPath);
					}

					context$2$0.prev = 20;
					context$2$0.next = 23;
					return navigationResponse;

				case 23:
					navigationResponse = context$2$0.sent;
					context$2$0.next = 26;
					return navigationResponse.json();

				case 26:
					context$2$0.t6 = context$2$0.sent;
					data.navigation = _utilsHumanizeTree2['default'](context$2$0.t6);
					context$2$0.next = 34;
					break;

				case 30:
					context$2$0.prev = 30;
					context$2$0.t7 = context$2$0['catch'](20);

					application.log.error('Could not fetch navigation from ' + navigationRoute.uri);
					this['throw'](context$2$0.t7, 500);

				case 34:
					if (!patternPath) {
						context$2$0.next = 49;
						break;
					}

					context$2$0.prev = 35;
					context$2$0.next = 38;
					return patternResponse;

				case 38:
					patternResponse = context$2$0.sent;
					context$2$0.next = 41;
					return patternResponse.json();

				case 41:
					patterns = context$2$0.sent;

					data.patterns = Array.isArray(patterns) ? patterns : [patterns];
					context$2$0.next = 49;
					break;

				case 45:
					context$2$0.prev = 45;
					context$2$0.t8 = context$2$0['catch'](35);

					application.log.error('Could not fetch initial data from ' + base + '/pattern/' + patternPath);
					application.log.error(context$2$0.t8);

				case 49:
					context$2$0.next = 51;
					return _reactRoutes2['default'](this.path, data);

				case 51:
					content = context$2$0.sent;
					context$2$0.next = 54;
					return iconsResponse;

				case 54:
					icons = context$2$0.sent;
					context$2$0.next = 57;
					return icons.text();

				case 57:
					icons = context$2$0.sent;

					this.body = _layouts2['default']({
						'title': data.schema.name,
						'data': JSON.stringify(data),
						'content': content,
						'script': '/script/index.js',
						'stylesheet': '/style/light.css',
						'icons': icons
					});

				case 59:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[1, 10], [20, 30], [35, 45]]);
	};
}

exports['default'] = indexRouteFactory;
module.exports = exports['default'];