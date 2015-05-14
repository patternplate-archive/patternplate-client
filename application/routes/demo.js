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
		var config, clientPath, base, path, uri, templateData, data, response;
		return regeneratorRuntime.async(function demoRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					config = application.configuration.client;
					clientPath = config.path[config.path.length - 1] === '/' ? config.path : '' + config.path + '/';
					base = 'http://' + config.host + ':' + config.port + '' + clientPath;
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
						context$2$0.next = 24;
						break;
					}

					context$2$0.next = 11;
					return fetch(uri);

				case 11:
					response = context$2$0.sent;
					context$2$0.prev = 12;
					context$2$0.next = 15;
					return response;

				case 15:
					response = context$2$0.sent;
					context$2$0.next = 22;
					break;

				case 18:
					context$2$0.prev = 18;
					context$2$0.t17 = context$2$0['catch'](12);

					application.log.error(context$2$0.t17);
					this['throw'](context$2$0.t17, 500);

				case 22:

					data = response.json();

					if (application.cache) {
						application.cache.set(uri, data);
					}

				case 24:
					context$2$0.prev = 24;
					context$2$0.next = 27;
					return data;

				case 27:
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
					context$2$0.next = 38;
					break;

				case 34:
					context$2$0.prev = 34;
					context$2$0.t18 = context$2$0['catch'](24);

					application.log.error(context$2$0.t18);
					this['throw'](context$2$0.t18, 500);

				case 38:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[12, 18], [24, 34]]);
	};
}

exports['default'] = demoRouteFactory;
module.exports = exports['default'];