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

var _lessPluginNpmImport = require('less-plugin-npm-import');

var _lessPluginNpmImport2 = _interopRequireDefault(_lessPluginNpmImport);

var _qIoFs = require('q-io/fs');

function styleRouteFactory(application) {

	return function scriptRoute() {
		var name, path, autoprefix, cleancss, npmimport, source, results;
		return regeneratorRuntime.async(function scriptRoute$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					name = (this.params.path || '').replace('.css', '.less');
					path = (0, _path.resolve)(application.runtime.cwd, 'assets', 'style', name);
					context$2$0.next = 4;
					return regeneratorRuntime.awrap((0, _qIoFs.exists)(path));

				case 4:
					if (context$2$0.sent) {
						context$2$0.next = 6;
						break;
					}

					return context$2$0.abrupt('return');

				case 6:
					autoprefix = new _lessPluginAutoprefix2['default']({ 'browser': ['IE 8', 'last 2 versions'] });
					cleancss = new _lessPluginCleanCss2['default']({ 'advanced': true });
					npmimport = new _lessPluginNpmImport2['default']();
					context$2$0.prev = 9;
					context$2$0.next = 12;
					return regeneratorRuntime.awrap((0, _qIoFs.read)(path));

				case 12:
					source = context$2$0.sent;
					context$2$0.next = 15;
					return regeneratorRuntime.awrap(_less2['default'].render(source, {
						'paths': [(0, _qIoFs.directory)(path)],
						'plugins': [npmimport, autoprefix, cleancss]
					}));

				case 15:
					results = context$2$0.sent;

					this.type = 'css';
					this.body = results.css;
					context$2$0.next = 24;
					break;

				case 20:
					context$2$0.prev = 20;
					context$2$0.t0 = context$2$0['catch'](9);

					application.log.error(context$2$0.t0);
					this['throw'](context$2$0.t0, 500);

				case 24:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this, [[9, 20]]);
	};
}

exports['default'] = styleRouteFactory;
module.exports = exports['default'];