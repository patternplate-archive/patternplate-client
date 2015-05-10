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
		var base, self, patternPath, data, response, navigationRoute, patternRoute, navigationResponse, iconsResponse, patternBase, patternResponse, patterns, content, icons;
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
					context$2$0.t6 = context$2$0['catch'](4);

					application.log.error('Could not fetch server schema from ' + base + '.');
					this['throw'](context$2$0.t6, 500);

				case 17:
					navigationRoute = data.schema.routes.filter(function (route) {
						return route.name === 'meta';
					})[0];
					patternRoute = data.schema.routes.filter(function (route) {
						return route.name === 'pattern';
					})[0];
					navigationResponse = fetch(navigationRoute.uri);
					iconsResponse = fetch('' + self + 'static/images/inline-icons.svg');

					if (patternPath) {
						patternBase = base[base.length] === '/' ? base : '' + base + '/';
						patternResponse = fetch('' + patternBase + 'pattern/' + patternPath);
					}

					context$2$0.prev = 22;
					context$2$0.next = 25;
					return navigationResponse;

				case 25:
					navigationResponse = context$2$0.sent;
					context$2$0.next = 28;
					return navigationResponse.json();

				case 28:
					context$2$0.t7 = context$2$0.sent;
					data.navigation = _utilsHumanizeTree2['default'](context$2$0.t7);
					context$2$0.next = 36;
					break;

				case 32:
					context$2$0.prev = 32;
					context$2$0.t8 = context$2$0['catch'](22);

					application.log.error('Could not fetch navigation from ' + navigationRoute.uri);
					this['throw'](context$2$0.t8, 500);

				case 36:
					if (!patternPath) {
						context$2$0.next = 51;
						break;
					}

					context$2$0.prev = 37;
					context$2$0.next = 40;
					return patternResponse;

				case 40:
					patternResponse = context$2$0.sent;
					context$2$0.next = 43;
					return patternResponse.json();

				case 43:
					patterns = context$2$0.sent;

					data.patterns = Array.isArray(patterns) ? patterns : [patterns];
					context$2$0.next = 51;
					break;

				case 47:
					context$2$0.prev = 47;
					context$2$0.t9 = context$2$0['catch'](37);

					application.log.error('Could not fetch initial data from ' + base + 'pattern/' + patternPath);
					application.log.error(context$2$0.t9);

				case 51:
					context$2$0.next = 53;
					return _reactRoutes2['default'](this.path, data);

				case 53:
					content = context$2$0.sent;
					context$2$0.next = 56;
					return iconsResponse;

				case 56:
					icons = context$2$0.sent;
					context$2$0.next = 59;
					return icons.text();

				case 59:
					icons = context$2$0.sent;

					this.body = _layouts2['default']({
						'title': data.schema.name,
						'data': JSON.stringify(data),
						'content': content,
						'script': '/script/index.js',
						'stylesheet': '/style/light.css',
						'icons': icons
					});

				case 61:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[4, 13], [22, 32], [37, 47]]);
	};
}

exports['default'] = indexRouteFactory;
module.exports = exports['default'];