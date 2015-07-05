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
		var config, serverConfig, serverHost, clientHost, proxied, path, host;
		return regeneratorRuntime.wrap(function apiRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					config = application.configuration.client;
					serverConfig = application.configuration.server;
					serverHost = serverConfig.host + ':' + serverConfig.port;
					clientHost = config.host + ':' + config.port;
					proxied = clientHost === serverHost;
					path = proxied ? '/api/pattern/' : '/pattern/';
					host = this.protocol + '://' + config.host + ':' + config.port + path;

					this.path = this.path.split('/').slice(2).join('/');

					Object.assign(this.headers, config.headers || {});

					if (config.credentials) {
						this.headers.authorization = 'Basic ' + (0, _btoa2['default'])(config.credentials.name + ':' + config.credentials.pass);
					}

					context$2$0.next = 12;
					return (0, _koaProxy2['default'])({ host: host }).call(this, next);

				case 12:
				case 'end':
					return context$2$0.stop();
			}
		}, apiRoute, this);
	});
}

exports['default'] = apiRouteFactory;
module.exports = exports['default'];