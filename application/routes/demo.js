'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('isomorphic-fetch');

var _layoutsDemo = require('../layouts/demo');

var _layoutsDemo2 = _interopRequireDefault(_layoutsDemo);

function demoRouteFactory(application) {
	var config = application.configuration.client;
	var base = 'http://' + config.server + ':' + config.port;

	return function demoRoute() {
		var path, templateData, response, data;
		return regeneratorRuntime.async(function demoRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					path = this.params[0].value;
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
					context$2$0.prev = 2;
					context$2$0.next = 5;
					return fetch('' + base + '/pattern/' + path);

				case 5:
					response = context$2$0.sent;
					context$2$0.next = 8;
					return response.json();

				case 8:
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

					context$2$0.next = 18;
					break;

				case 14:
					context$2$0.prev = 14;
					context$2$0.t4 = context$2$0['catch'](2);

					application.log.error(context$2$0.t4);
					this['throw'](context$2$0.t4, 500);

				case 18:
					context$2$0.prev = 18;

					this.body = _layoutsDemo2['default'](templateData);
					return context$2$0.finish(18);

				case 21:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[2, 14, 18, 21]]);
	};
}

exports['default'] = demoRouteFactory;
module.exports = exports['default'];