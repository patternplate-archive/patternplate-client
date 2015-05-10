'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _path = require('path');

require('isomorphic-fetch');

function apiRouteFactory(application) {
	return function apiRoute() {
		var config, path, clientPath, base, response, data;
		return regeneratorRuntime.async(function apiRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					config = application.configuration.client;
					path = this.params.path;
					clientPath = config.path[config.path.length - 1] === '/' ? config.path : '' + config.path + '/';
					base = 'http://' + config.host + ':' + config.port + '' + clientPath;
					context$2$0.prev = 4;
					context$2$0.next = 7;
					return fetch('' + base + '' + path, { 'headers': { 'accept-type': 'application/json' } });

				case 7:
					response = context$2$0.sent;
					context$2$0.next = 10;
					return response.json();

				case 10:
					data = context$2$0.sent;

					if (!(response.status < 400)) {
						context$2$0.next = 15;
						break;
					}

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
					context$2$0.t85 = context$2$0['catch'](4);

					this['throw'](context$2$0.t85, 500);

				case 21:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[4, 18]]);
	};
}

exports['default'] = apiRouteFactory;
module.exports = exports['default'];