#!/usr/bin/env node --harmony

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('babel-core/polyfill');

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var args = (0, _minimist2['default'])(process.argv.slice(1));

function start() {
	var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	var application, stop;
	return regeneratorRuntime.async(function start$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				stop = function stop() {
					return regeneratorRuntime.async(function stop$(context$2$0) {
						while (1) switch (context$2$0.prev = context$2$0.next) {
							case 0:
								context$2$0.prev = 0;
								context$2$0.next = 3;
								return regeneratorRuntime.awrap(application.stop());

							case 3:
								process.exit(0);
								context$2$0.next = 10;
								break;

							case 6:
								context$2$0.prev = 6;
								context$2$0.t0 = context$2$0['catch'](0);

								application.log.error(context$2$0.t0);
								process.exit(1);

							case 10:
							case 'end':
								return context$2$0.stop();
						}
					}, null, this, [[0, 6]]);
				};

				application = undefined;
				context$1$0.prev = 2;
				context$1$0.next = 5;
				return regeneratorRuntime.awrap((0, _2['default'])(options));

			case 5:
				application = context$1$0.sent;
				context$1$0.next = 12;
				break;

			case 8:
				context$1$0.prev = 8;
				context$1$0.t0 = context$1$0['catch'](2);

				console.trace(context$1$0.t0);
				throw new Error(new Error(context$1$0.t0).stack);

			case 12:
				context$1$0.prev = 12;
				context$1$0.next = 15;
				return regeneratorRuntime.awrap(application.start());

			case 15:
				context$1$0.next = 21;
				break;

			case 17:
				context$1$0.prev = 17;
				context$1$0.t1 = context$1$0['catch'](12);

				application.log.error(new Error(context$1$0.t1).stack);
				throw new Error(context$1$0.t1);

			case 21:

				process.on('SIGINT', function () {
					return stop('SIGINT');
				});
				process.on('SIGHUP', function () {
					return stop('SIGHUP');
				});
				process.on('SIGQUIT', function () {
					return stop('SIGQUIT');
				});
				process.on('SIGABRT', function () {
					return stop('SIGABRT');
				});
				process.on('SIGTERM', function () {
					return stop('SIGTERM');
				});

			case 26:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this, [[2, 8], [12, 17]]);
}

start(args);