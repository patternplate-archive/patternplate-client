'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var Home = (function (_React$Component) {
	function Home() {
		_classCallCheck(this, Home);

		if (_React$Component != null) {
			_React$Component.apply(this, arguments);
		}

		this.displayName = 'Home';
	}

	_inherits(Home, _React$Component);

	_createClass(Home, [{
		key: 'render',
		value: function render() {
			var readme = this.props.schema.readme || '';
			return _react2['default'].createElement(
				'main',
				{ className: 'content home' },
				_react2['default'].createElement('div', { className: 'markdown', dangerouslySetInnerHTML: { '__html': readme } }),
				_react2['default'].createElement(_messages2['default'], { eventEmitter: this.props.eventEmitter })
			);
		}
	}]);

	return Home;
})(_react2['default'].Component);

exports['default'] = Home;
module.exports = exports['default'];