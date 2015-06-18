'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('isomorphic-fetch');

var _layoutsDemo = require('../layouts/demo');

var _layoutsDemo2 = _interopRequireDefault(_layoutsDemo);

function getWrapper(expression) {
	if (!expression) {
		return function faithfulWrapper(input) {
			return input;
		};
	}

	if (expression === '!IE') {
		return function noIEWrapper(input) {
			return '<!--[if !IE]> -->\n' + input + '\n<!-- <![endif]-->';
		};
	}

	return function IEWrapper(input) {
		return '<!--[if ' + expression + ']>\n' + input + '\n<![endif]-->';
	};
}

function demoRouteFactory(application) {
	return function demoRoute() {
		var config, clientPath, base, headers, path, uri, data, response, templateData, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, environmentName, environment, envConfig, wrapper, blueprint, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, resultType, result, templateKey, content, templateSectionData;

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
					data = undefined;

					if (application.cache) {
						data = application.cache.get(uri);
					}

					if (data) {
						context$2$0.next = 24;
						break;
					}

					context$2$0.next = 11;
					return regeneratorRuntime.awrap(fetch(uri, { headers: headers }));

				case 11:
					response = context$2$0.sent;
					context$2$0.prev = 12;
					context$2$0.next = 15;
					return regeneratorRuntime.awrap(response);

				case 15:
					response = context$2$0.sent;
					context$2$0.next = 22;
					break;

				case 18:
					context$2$0.prev = 18;
					context$2$0.t0 = context$2$0['catch'](12);

					application.log.error(context$2$0.t0);
					this['throw'](context$2$0.t0, 500);

				case 22:

					data = response.json();

					if (application.cache) {
						application.cache.set(uri, data);
					}

				case 24:
					context$2$0.prev = 24;
					context$2$0.next = 27;
					return regeneratorRuntime.awrap(data);

				case 27:
					data = context$2$0.sent;
					templateData = {
						'title': path,
						'style': [],
						'script': [],
						'markup': []
					};
					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					context$2$0.prev = 32;
					_iterator = Object.keys(data.results)[Symbol.iterator]();

				case 34:
					if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
						context$2$0.next = 62;
						break;
					}

					environmentName = _step.value;
					environment = data.results[environmentName];
					envConfig = data.environments[environmentName].manifest;
					wrapper = getWrapper(envConfig['conditional-comment']);
					blueprint = { 'environment': environmentName, 'content': '', wrapper: wrapper };
					_iteratorNormalCompletion2 = true;
					_didIteratorError2 = false;
					_iteratorError2 = undefined;
					context$2$0.prev = 43;

					for (_iterator2 = Object.keys(environment)[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						resultType = _step2.value;
						result = environment[resultType];
						templateKey = resultType.toLowerCase();
						content = result.demoBuffer || result.buffer;
						templateSectionData = Object.assign({}, blueprint, { content: content });

						templateData[templateKey] = Array.isArray(templateData[templateKey]) ? templateData[templateKey].concat([templateSectionData]) : [templateSectionData];
					}
					context$2$0.next = 51;
					break;

				case 47:
					context$2$0.prev = 47;
					context$2$0.t1 = context$2$0['catch'](43);
					_didIteratorError2 = true;
					_iteratorError2 = context$2$0.t1;

				case 51:
					context$2$0.prev = 51;
					context$2$0.prev = 52;

					if (!_iteratorNormalCompletion2 && _iterator2['return']) {
						_iterator2['return']();
					}

				case 54:
					context$2$0.prev = 54;

					if (!_didIteratorError2) {
						context$2$0.next = 57;
						break;
					}

					throw _iteratorError2;

				case 57:
					return context$2$0.finish(54);

				case 58:
					return context$2$0.finish(51);

				case 59:
					_iteratorNormalCompletion = true;
					context$2$0.next = 34;
					break;

				case 62:
					context$2$0.next = 68;
					break;

				case 64:
					context$2$0.prev = 64;
					context$2$0.t2 = context$2$0['catch'](32);
					_didIteratorError = true;
					_iteratorError = context$2$0.t2;

				case 68:
					context$2$0.prev = 68;
					context$2$0.prev = 69;

					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}

				case 71:
					context$2$0.prev = 71;

					if (!_didIteratorError) {
						context$2$0.next = 74;
						break;
					}

					throw _iteratorError;

				case 74:
					return context$2$0.finish(71);

				case 75:
					return context$2$0.finish(68);

				case 76:
					this.body = (0, _layoutsDemo2['default'])(templateData);
					context$2$0.next = 83;
					break;

				case 79:
					context$2$0.prev = 79;
					context$2$0.t3 = context$2$0['catch'](24);

					application.log.error(context$2$0.t3);
					this['throw'](context$2$0.t3, 500);

				case 83:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[12, 18], [24, 79], [32, 64, 68, 76], [43, 47, 51, 59], [52,, 54, 58], [69,, 71, 75]]);
	};
}

exports['default'] = demoRouteFactory;
module.exports = exports['default'];