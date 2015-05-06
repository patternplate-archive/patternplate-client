'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _less = require('less');

var _less2 = _interopRequireDefault(_less);

var _lessPluginAutoprefix = require('less-plugin-autoprefix');

var _lessPluginAutoprefix2 = _interopRequireDefault(_lessPluginAutoprefix);

var _lessPluginCleanCss = require('less-plugin-clean-css');

var _lessPluginCleanCss2 = _interopRequireDefault(_lessPluginCleanCss);

var _qIoFs = require('q-io/fs');

function styleRouteFactory(application) {

	return function scriptRoute() {
		var name, path, autoprefix, cleancss, source, results;
		return regeneratorRuntime.async(function scriptRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					name = this.params[0].value.replace('.css', '.less');
					path = _path.resolve(application.runtime.cwd, 'assets', 'style', name);
					context$2$0.next = 4;
					return _qIoFs.exists(path);

				case 4:
					if (context$2$0.sent) {
						context$2$0.next = 6;
						break;
					}

					return context$2$0.abrupt('return');

				case 6:
					autoprefix = new _lessPluginAutoprefix2['default']({ 'browser': ['IE 8', 'last 2 versions'] });
					cleancss = new _lessPluginCleanCss2['default']({ 'advanced': true });
					context$2$0.prev = 8;
					context$2$0.next = 11;
					return _qIoFs.read(path);

				case 11:
					source = context$2$0.sent;
					context$2$0.next = 14;
					return _less2['default'].render(source, {
						'paths': [_qIoFs.directory(path), _path.resolve(application.runtime.cwd, 'node_modules')],
						'plugins': [autoprefix, cleancss]
					});

				case 14:
					results = context$2$0.sent;

					this.type = 'css';
					this.body = results.css;
					context$2$0.next = 23;
					break;

				case 19:
					context$2$0.prev = 19;
					context$2$0.t10 = context$2$0['catch'](8);

					application.log.error(context$2$0.t10);
					this['throw'](context$2$0.t10, 500);

				case 23:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[8, 19]]);
	};
}

exports['default'] = styleRouteFactory;
module.exports = exports['default'];