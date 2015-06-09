/*eslint-disable no-console */
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var _bind = Function.prototype.bind;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _iframeConsole = require('./iframe-console');

var _iframeConsole2 = _interopRequireDefault(_iframeConsole);

var IFrameWindow = function IFrameWindow(frame) {
	_classCallCheck(this, IFrameWindow);

	this.window = frame.contentWindow.window;
	var console = new _iframeConsole2['default'](frame.src);

	Object.assign(this.window, {
		'alert': function iframeAlert() {
			return console.warn('window.alert is disabled in patterns.');
		},
		'confirm': function iframeConfirm() {
			return console.warn('window.confirm is disabled in patterns.');
		},
		'open': function iframeOpen() {
			return console.warn('window.open is disabled in patterns.');
		}
	}, {
		'console': console
	});
};

function iframeWindowFactory() {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	return new (_bind.apply(IFrameWindow, [null].concat(args)))();
}

exports['default'] = iframeWindowFactory;
exports.iframeWindowFactory = iframeWindowFactory;
exports.IFrameWindow = IFrameWindow;