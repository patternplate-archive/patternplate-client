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
		_classCallCheck(this, Message);

		if (_Component != null) {
			_Component.apply(this, arguments);
		}

		this.state = {
			'style': { 'bottom': '-50px' }
		};
	}

	_inherits(Message, _Component);

	_createClass(Message, [{
		key: 'onButtonClick',
		value: function onButtonClick() {
			this.props.manager.pull(this.props.index);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setState({ 'style': { 'bottom': '' + this.props.index * 50 + 'px' } });
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(props) {
			this.setState({ 'style': { 'bottom': '' + props.index * 50 + 'px' } });
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.setState({ 'style': { 'bottom': '' } });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this = this;

			return _react2['default'].createElement(
				'div',
				{ className: 'message', style: this.state.style },
				_react2['default'].createElement(
					'div',
					{ className: 'message-container', key: 'single' },
					_react2['default'].createElement(
						'div',
						{ className: 'message-content' },
						this.props.children
					),
					_react2['default'].createElement(
						'button',
						{ onClick: function (e) {
								return _this.onButtonClick(e);
							}, className: 'message-close', type: 'button' },
						'Close'
					)
				)
			);
		}
	}], [{
		key: 'displayName',
		value: 'Message',
		enumerable: true
	}]);

	return Message;
})(_react.Component);

exports['default'] = Message;
module.exports = exports['default'];