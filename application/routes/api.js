'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('isomorphic-fetch');

var _filtersPatternApi = require('../filters/pattern-api');

var _filtersPatternApi2 = _interopRequireDefault(_filtersPatternApi);

function apiRouteFactory(application) {
	var config = application.configuration.client;
	var base = 'http://' + config.server + ':' + config.port;
	var filter = _filtersPatternApi2['default'](application);

	return function apiRoute() {
		var data, path, response;
		return regeneratorRuntime.async(function apiRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					data = {};
					path = this.params[0].value;
					context$2$0.prev = 2;
					context$2$0.next = 5;
					return fetch('' + base + '/' + path);

				case 5:
					response = context$2$0.sent;
					context$2$0.next = 8;
					return response.json();

				case 8:
					data = context$2$0.sent;
					context$2$0.next = 11;
					return filter(data, path);

				case 11:
					data = context$2$0.sent;
					context$2$0.next = 18;
					break;

				case 14:
					context$2$0.prev = 14;
					context$2$0.t1 = context$2$0['catch'](2);

					application.log.error(context$2$0.t1);
					this['throw'](context$2$0.t1, 500);

				case 18:
					context$2$0.prev = 18;

					this.type = 'json';
					this.body = data;
					return context$2$0.finish(18);

				case 22:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[2, 14, 18, 22]]);
	};
}

exports['default'] = apiRouteFactory;
module.exports = exports['default'];