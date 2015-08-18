'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var IframeConsole = (function () {
	function IframeConsole() {
		var origin = arguments[0] === undefined ? '' : arguments[0];

		_classCallCheck(this, IframeConsole);

		this.origin = origin;
		this.prefix = '[' + origin + ']';
		this.native = window.console;
	}

	_createClass(IframeConsole, [{
		key: 'trace',
		value: function trace() {
			var _native;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return (_native = this.native).trace.apply(_native, [this.prefix].concat(args));
		}
	}, {
		key: 'debug',
		value: function debug() {
			var _native2;

			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			return (_native2 = this.native).debug.apply(_native2, [this.prefix].concat(args));
		}
	}, {
		key: 'info',
		value: function info() {
			var _native3;

			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			return (_native3 = this.native).info.apply(_native3, [this.prefix].concat(args));
		}
	}, {
		key: 'log',
		value: function log() {
			var _native4;

			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			return (_native4 = this.native).log.apply(_native4, [this.prefix].concat(args));
		}
	}, {
		key: 'warn',
		value: function warn() {
			var _native5;

			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			return (_native5 = this.native).warn.apply(_native5, [this.prefix].concat(args));
		}
	}, {
		key: 'error',
		value: function error() {
			var _native6;

			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}

			return (_native6 = this.native).error.apply(_native6, [this.prefix].concat(args));
		}
	}]);

	return IframeConsole;
})();

exports['default'] = IframeConsole;
module.exports = exports['default'];