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
		var config, clientPath, base, path, templateData, response, data;
		return regeneratorRuntime.async(function demoRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					config = application.configuration.client;
					clientPath = config.path[config.path.length - 1] === '/' ? config.path : '' + config.path + '/';
					base = 'http://' + config.host + ':' + config.port + '' + clientPath;
					path = this.params.path;
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
					context$2$0.next = 7;
					return fetch('' + base + 'pattern/' + path);

				case 7:
					response = context$2$0.sent;
					context$2$0.prev = 8;
					context$2$0.next = 11;
					return response;

				case 11:
					response = context$2$0.sent;
					context$2$0.next = 18;
					break;

				case 14:
					context$2$0.prev = 14;
					context$2$0.t4 = context$2$0['catch'](8);

					application.log.error(context$2$0.t4);
					this['throw'](context$2$0.t4, 500);

				case 18:
					data = response.json();
					context$2$0.prev = 19;
					context$2$0.next = 22;
					return data;

				case 22:
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
					context$2$0.next = 33;
					break;

				case 29:
					context$2$0.prev = 29;
					context$2$0.t5 = context$2$0['catch'](19);

					application.log.error(context$2$0.t5);
					this['throw'](context$2$0.t5, 500);

				case 33:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[8, 14], [19, 29]]);
	};
}

exports['default'] = demoRouteFactory;
module.exports = exports['default'];