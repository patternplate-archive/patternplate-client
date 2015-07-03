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

var Message = (function (_Component) {
	function Message() {
		var _this = this;

		_classCallCheck(this, Message);

		if (_Component != null) {
			_Component.apply(this, arguments);
		}

		this.onButtonClick = function () {
			_this.props.manager.pull(_this.props.index);
		};

		this.render = function () {
			var style = {
				bottom: '' + _this.props.index * 50 + 'px'
			};

			return _react2['default'].createElement(
				'div',
				{ className: 'message ' + _this.props.type, style: style },
				_react2['default'].createElement(
					'div',
					{ className: 'message-container', key: 'single' },
					_react2['default'].createElement(
						'div',
						{ className: 'message-content' },
						_this.props.children
					),
					_react2['default'].createElement(
						'button',
						{ onClick: _this.onButtonClick, className: 'message-close', type: 'button' },
						'Close'
					)
				)
			);
		};
	}

	_inherits(Message, _Component);

	_createClass(Message, null, [{
		key: 'propTypes',
		value: {
			'type': _react.PropTypes.oneOf(['info', 'error', 'success'])
		},
		enumerable: true
	}]);

	return Message;
})(_react.Component);

exports['default'] = Message;
module.exports = exports['default'];