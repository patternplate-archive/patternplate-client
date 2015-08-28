'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _btoa = require('btoa');

var _btoa2 = _interopRequireDefault(_btoa);

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var Messages = (function (_Component) {
	_inherits(Messages, _Component);

	_createClass(Messages, null, [{
		key: 'displayName',
		value: 'Messages',
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {
			'max': 3,
			'messages': []
		},
		enumerable: true
	}, {
		key: 'propTypes',
		value: {
			'max': _react.PropTypes.number.isRequired
		},
		enumerable: true
	}]);

	function Messages() {
		var _this = this;

		_classCallCheck(this, Messages);

		_get(Object.getPrototypeOf(Messages.prototype), 'constructor', this).call(this);
		this.state = {
			'messages': []
		};

		this.pushError = function (message) {
			return _this.push(message, 'error');
		};

		this.push = this.push.bind(this);
	}

	_createClass(Messages, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this2 = this;

			this.props.messages.forEach(function (message) {
				_this2.push(message.content, message.type);
			});

			this.props.eventEmitter.addListener('error', this.pushError);
			this.props.eventEmitter.addListener('message', this.push);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.props.eventEmitter.removeListener('error', this.pushError);
			this.props.eventEmitter.removeListener('message', this.push);
		}
	}, {
		key: 'push',
		value: function push(message) {
			var type = arguments.length <= 1 || arguments[1] === undefined ? 'info' : arguments[1];

			var messages = this.state.messages.slice(0);
			messages.push({
				'content': message,
				'type': type,
				'date': Date.now(),
				'hash': (0, _btoa2['default'])('' + message.message + Date.now())
			});
			messages = messages.slice(this.props.max * -1);

			this.setState({
				'messages': messages
			});
		}
	}, {
		key: 'pull',
		value: function pull(index) {
			var messages = this.state.messages.slice(0);
			messages.splice(index, 1);

			this.setState({
				'messages': messages
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var children = this.state.messages.sort(function (a, b) {
				return a.date - b.date;
			}).map(function (message, index) {
				return _react2['default'].createElement(
					_message2['default'],
					{ key: message.hash, index: index, date: message.date, type: message.type, manager: _this3 },
					message.content
				);
			});

			return _react2['default'].createElement(
				'div',
				{ className: 'messages' },
				children
			);
		}
	}]);

	return Messages;
})(_react.Component);

exports['default'] = Messages;
module.exports = exports['default'];