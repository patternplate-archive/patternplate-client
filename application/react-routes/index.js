'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _events = require('events');

var _components = require('../components');

var _components2 = _interopRequireDefault(_components);

var _componentsContent = require('../components/content');

var _componentsContent2 = _interopRequireDefault(_componentsContent);

var _componentsContent3 = _interopRequireDefault(_componentsContent);

var routes = _react2['default'].createElement(
	_reactRouter.Route,
	{ name: 'root', path: '/', handler: _components2['default'] },
	_react2['default'].createElement(_reactRouter.DefaultRoute, { handler: _componentsContent3['default'] }),
	_react2['default'].createElement(_reactRouter.Route, { name: 'pattern', path: '/pattern/*', handler: _componentsContent2['default'] })
);

function router(_x, data) {
	var path = arguments[0] === undefined ? '/' : arguments[0];

	return new Promise(function (resolve) {
		var eventEmitter = new _events.EventEmitter();

		_reactRouter2['default'].run(routes, path, function (Handler, state) {
			var appData = Object.assign({}, data, state, { eventEmitter: eventEmitter });
			resolve(_react2['default'].renderToString(_react2['default'].createElement(Handler, appData)));
		});
	});
}

function client(data, el) {
	return new Promise(function (resolve) {
		var eventEmitter = new _events.EventEmitter();

		_reactRouter2['default'].run(routes, _reactRouter2['default'].HistoryLocation, function (Handler, state) {
			var appData = Object.assign({}, data, state, { eventEmitter: eventEmitter });
			resolve(_react2['default'].render(_react2['default'].createElement(Handler, appData), el));
		});
	});
}

exports['default'] = router;
exports.client = client;