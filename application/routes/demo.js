'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('isomorphic-fetch');

var _layoutsDemo = require('../layouts/demo');

var _layoutsDemo2 = _interopRequireDefault(_layoutsDemo);

function demoRouteFactory(application) {
	return function demoRoute() {
		var config, clientPath, base, headers, path, uri, templateData, data, response;
		return regeneratorRuntime.async(function demoRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					config = application.configuration.client;
					clientPath = config.path[config.path.length - 1] === '/' ? config.path : '' + config.path + '/';
					base = 'http://' + config.host + ':' + config.port + '' + clientPath;
					headers = {
						'accept-type': 'application/json',
						'authorization': this.request.header.authorization
					};
					path = this.params.path;
					uri = '' + base + 'pattern/' + path;
					templateData = {
						'style': {
							'index': '',
							'demo': ''
						},
						'script': {
							'index': '',
							'demo': ''
						},
						'content': '',
						'raw': null,
						'title': path
					};
					data = undefined;

					if (application.cache) {
						data = application.cache.get(uri);
					}

					if (data) {
						context$2$0.next = 25;
						break;
					}

					context$2$0.next = 12;
					return fetch(uri, { headers: headers });

				case 12:
					response = context$2$0.sent;
					context$2$0.prev = 13;
					context$2$0.next = 16;
					return response;

				case 16:
					response = context$2$0.sent;
					context$2$0.next = 23;
					break;

				case 19:
					context$2$0.prev = 19;
					context$2$0.t208 = context$2$0['catch'](13);

					application.log.error(context$2$0.t208);
					this['throw'](context$2$0.t208, 500);

				case 23:

					data = response.json();

					if (application.cache) {
						application.cache.set(uri, data);
					}

				case 25:
					context$2$0.prev = 25;
					context$2$0.next = 28;
					return data;

				case 28:
					data = context$2$0.sent;

					if (data.results.Style) {
						templateData.style.index = data.results.Style.buffer || '';
						templateData.style.demo = data.results.Style.demoBuffer || '';
					}

					if (data.results.Markup) {
						templateData.content = data.results.Markup.demoBuffer || data.results.Markup.buffer;
					}

					if (data.results.Script) {
						templateData.script.index = data.results.Script.buffer || '';
						templateData.script.demo = data.results.Script.demoBuffer || '';
					}
					this.body = _layoutsDemo2['default'](templateData);
					context$2$0.next = 39;
					break;

				case 35:
					context$2$0.prev = 35;
					context$2$0.t209 = context$2$0['catch'](25);

					application.log.error(context$2$0.t209);
					this['throw'](context$2$0.t209, 500);

				case 39:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[13, 19], [25, 35]]);
	};
}

exports['default'] = demoRouteFactory;
module.exports = exports['default'];