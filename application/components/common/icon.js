'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Icon = (function (_React$Component) {
	_inherits(Icon, _React$Component);

	function Icon() {
		_classCallCheck(this, Icon);

		_get(Object.getPrototypeOf(Icon.prototype), 'constructor', this).apply(this, arguments);

		this.displayName = 'Icon';
	}

	_createClass(Icon, [{
		key: 'render',
		value: function render() {
			var className = (0, _classnames2['default'])('icon', this.props.className);
			var textClassName = (0, _classnames2['default'])('svg-text', { 'svg-fallback': this.props.fallback });

			var href = this.props.inline ? '#' + this.props.symbol : this.props.uri + '#' + this.props.symbol;
			var text = this.props.children ? _react2['default'].createElement(
				'div',
				{ className: textClassName },
				this.props.children
			) : '';

			var svg = '<svg class="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="' + href + '" /></svg>';

			return _react2['default'].createElement(
				'div',
				{ className: className },
				_react2['default'].createElement('div', { className: 'svg-icon', dangerouslySetInnerHTML: { '__html': svg } }),
				text
			);
		}
	}], [{
		key: 'defaultProps',
		value: {
			'uri': '/static/images/icons.svg',
			'fallback': true,
			'inline': false
		},
		enumerable: true
	}, {
		key: 'propTypes',
		value: {
			'uri': _react.PropTypes.string.isRequired,
			'symbol': _react.PropTypes.string.isRequired,
			'className': _react.PropTypes.string,
			'fallback': _react.PropTypes.bool.isRequired,
			'inline': _react.PropTypes.bool.isRequired
		},
		enumerable: true
	}]);

	return Icon;
})(_react2['default'].Component);

exports['default'] = Icon;
module.exports = exports['default'];