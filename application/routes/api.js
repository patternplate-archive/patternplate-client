'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _path = require('path');

require('isomorphic-fetch');

function apiRouteFactory(application) {
	return function apiRoute() {
		var config, path, clientPath, base, uri, data, response;
		return regeneratorRuntime.async(function apiRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					config = application.configuration.client;
					path = this.params.path;
					clientPath = config.path[config.path.length - 1] === '/' ? config.path : '' + config.path + '/';
					base = 'http://' + config.host + ':' + config.port + '' + clientPath;
					uri = '' + base + '' + path;
					data = undefined;

					if (application.cache) {
						data = application.cache.get(uri);
					}

					if (data) {
						context$2$0.next = 23;
						break;
					}

					context$2$0.prev = 8;
					context$2$0.next = 11;
					return fetch(uri, { 'headers': { 'accept-type': 'application/json' } });

				case 11:
					response = context$2$0.sent;
					context$2$0.next = 14;
					return response.json();

				case 14:
					data = context$2$0.sent;

					if (application.cache) {
						application.cache.set(uri, data);
					}

					if (!(response.status >= 400)) {
						context$2$0.next = 18;
						break;
					}

					throw new Error(data.message || 'Request to ' + base + '/' + path + ' failed', data.error || {});

				case 18:
					context$2$0.next = 23;
					break;

				case 20:
					context$2$0.prev = 20;
					context$2$0.t3 = context$2$0['catch'](8);

					this['throw'](context$2$0.t3, 500);

				case 23:

					this.body = data;

				case 24:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[8, 20]]);
	};
}

exports['default'] = apiRouteFactory;
module.exports = exports['default'];