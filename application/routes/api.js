'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _koaProxy = require('koa-proxy');

var _koaProxy2 = _interopRequireDefault(_koaProxy);

var _btoa = require('btoa');

var _btoa2 = _interopRequireDefault(_btoa);

function apiRouteFactory(application) {
	return regeneratorRuntime.mark(function apiRoute(next) {
		var config, host;
		return regeneratorRuntime.wrap(function apiRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					config = application.configuration.client;
					host = 'http://' + config.host + ':' + config.port;

					this.path = '/' + this.path.split('/').slice(2).join('/');

					Object.assign(this.headers, config.headers || {});

					if (config.credentials) {
						this.headers.authorization = 'Basic ' + (0, _btoa2['default'])(config.credentials.name + ':' + config.credentials.pass);
					}

					context$2$0.next = 7;
					return (0, _koaProxy2['default'])({ host: host }).call(this, next);

				case 7:
				case 'end':
					return context$2$0.stop();
			}
		}, apiRoute, this);
	});
}

exports['default'] = apiRouteFactory;
module.exports = exports['default'];