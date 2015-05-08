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
		var path, response, data;
		return regeneratorRuntime.async(function apiRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					path = this.params[0].value;
					context$2$0.prev = 1;
					context$2$0.next = 4;
					return fetch('' + base + '/' + path, { 'headers': { 'accept-type': 'application/json' } });

				case 4:
					response = context$2$0.sent;
					context$2$0.next = 7;
					return response.json();

				case 7:
					data = context$2$0.sent;

					if (!(response.status < 400)) {
						context$2$0.next = 15;
						break;
					}

					context$2$0.next = 11;
					return filter(data, path);

				case 11:
					data = context$2$0.sent;

					this.body = data;
					context$2$0.next = 16;
					break;

				case 15:
					throw new Error(data.message || 'Request to ' + base + '/' + path + ' failed', data.error || {});

				case 16:
					context$2$0.next = 21;
					break;

				case 18:
					context$2$0.prev = 18;
					context$2$0.t3 = context$2$0['catch'](1);

					this['throw'](context$2$0.t3, 500);

				case 21:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[1, 18]]);
	};
}

exports['default'] = apiRouteFactory;
module.exports = exports['default'];