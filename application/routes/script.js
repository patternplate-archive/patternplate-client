'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _path = require('path');

var _browserify = require('browserify');

var _browserify2 = _interopRequireDefault(_browserify);

var _qIoFs = require('q-io/fs');

var memo = {};

function bundle(bundler) {
	return new Promise(function (resolve, reject) {
		bundler.bundle(function (err, buffer) {
			if (err) {
				return reject(err);
			}
			resolve(buffer);
		});
	});
}

function preBundle(application) {
	var scripts, files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, bundler;

	return regeneratorRuntime.async(function preBundle$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				if (!(application.configuration.environment === 'production')) {
					context$1$0.next = 42;
					break;
				}

				scripts = _path.resolve(application.runtime.cwd, 'assets', 'script');
				context$1$0.next = 4;
				return _qIoFs.list(scripts);

			case 4:
				files = context$1$0.sent;
				_iteratorNormalCompletion = true;
				_didIteratorError = false;
				_iteratorError = undefined;
				context$1$0.prev = 8;
				_iterator = files[Symbol.iterator]();

			case 10:
				if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
					context$1$0.next = 28;
					break;
				}

				file = _step.value;
				bundler = _browserify2['default']();

				bundler.transform(babelify.configure({
					'stage': 0,
					'ignore': /node_modules/,
					'optional': ['runtime']
				}));

				bundler.transform(uglifyify.configure({
					'global': true
				}));

				bundler.add(_path.resolve(scripts, file));

				context$1$0.prev = 16;
				context$1$0.next = 19;
				return bundle(bundler);

			case 19:
				memo[_path.resolve(scripts, file)] = context$1$0.sent;
				context$1$0.next = 25;
				break;

			case 22:
				context$1$0.prev = 22;
				context$1$0.t12 = context$1$0['catch'](16);

				application.log.error(context$1$0.t12);

			case 25:
				_iteratorNormalCompletion = true;
				context$1$0.next = 10;
				break;

			case 28:
				context$1$0.next = 34;
				break;

			case 30:
				context$1$0.prev = 30;
				context$1$0.t13 = context$1$0['catch'](8);
				_didIteratorError = true;
				_iteratorError = context$1$0.t13;

			case 34:
				context$1$0.prev = 34;
				context$1$0.prev = 35;

				if (!_iteratorNormalCompletion && _iterator['return']) {
					_iterator['return']();
				}

			case 37:
				context$1$0.prev = 37;

				if (!_didIteratorError) {
					context$1$0.next = 40;
					break;
				}

				throw _iteratorError;

			case 40:
				return context$1$0.finish(37);

			case 41:
				return context$1$0.finish(34);

			case 42:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this, [[8, 30, 34, 42], [16, 22], [35,, 37, 41]]);
}

function applyTransforms(bundler, transformNames, transformConfigs, transformDictionary) {
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = transformNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var transformName = _step2.value;

			/*eslint-disable no-continue*/
			var transformFn = transformDictionary[transformName];
			var args = undefined;

			if (!transformFn) {
				continue;
			}

			if (typeof transformFn.configure === 'function') {
				args = [transformFn.configure(transformConfigs[transformName])];
			} else {
				args = [transformFn, transformConfigs[transformName]];
			}

			bundler.transform.apply(bundler, _toConsumableArray(args));
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2['return']) {
				_iterator2['return']();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	return bundler;
}

function scriptRouteFactory(application) {
	var browserifyConfig = application.configuration.assets.browserify || {};

	var transformNames = Object.keys(browserifyConfig.transforms).filter(function (transformName) {
		return browserifyConfig.transforms[transformName].enabled;
	});

	var transformConfigs = transformNames.reduce(function getTransformConfig(results, transformName) {
		results[transformName] = browserifyConfig.transforms[transformName].opts || {};
		return results;
	}, {});

	var transformFns = transformNames.reduce(function getTransformFns(results, transformName) {
		results[transformName] = require(require.resolve(transformName));
		return results;
	}, {});

	var useTransforms = function useTransforms(bundler) {
		return applyTransforms(bundler, transformNames, transformConfigs, transformFns);
	};

	try {
		preBundle(application);
	} catch (err) {
		application.log.warn('Prebundling of scripts failed');
		application.log.trace(err);
	}

	return function scriptRoute() {
		var path, bundler;
		return regeneratorRuntime.async(function scriptRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					path = _path.resolve(application.runtime.cwd, 'assets', 'script', this.params.path || '');
					context$2$0.next = 3;
					return _qIoFs.exists(path);

				case 3:
					if (context$2$0.sent) {
						context$2$0.next = 5;
						break;
					}

					return context$2$0.abrupt('return');

				case 5:

					this.type = 'js';

					if (!(application.configuration.environment === 'production' && memo[path])) {
						context$2$0.next = 9;
						break;
					}

					this.body = memo[path];
					return context$2$0.abrupt('return');

				case 9:
					bundler = _browserify2['default']();

					useTransforms(bundler);
					bundler.add(path);

					context$2$0.prev = 12;
					context$2$0.next = 15;
					return bundle(bundler);

				case 15:
					memo[path] = context$2$0.sent;

					this.body = memo[path];
					context$2$0.next = 23;
					break;

				case 19:
					context$2$0.prev = 19;
					context$2$0.t14 = context$2$0['catch'](12);

					application.log.error(context$2$0.t14);
					this['throw'](context$2$0.t14, 500);

				case 23:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[12, 19]]);
	};
}

exports['default'] = scriptRouteFactory;
module.exports = exports['default'];