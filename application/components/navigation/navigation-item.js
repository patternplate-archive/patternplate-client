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

var _reactRouter = require('react-router');

var _commonIcon = require('../common/icon');

var _commonIcon2 = _interopRequireDefault(_commonIcon);

var NavigationItem = (function (_React$Component) {
	_inherits(NavigationItem, _React$Component);

	function NavigationItem() {
		_classCallCheck(this, NavigationItem);

		_get(Object.getPrototypeOf(NavigationItem.prototype), 'constructor', this).apply(this, arguments);

		this.displayName = 'NavigationItem';
	}

	_createClass(NavigationItem, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var name = _props.name;
			var symbol = _props.symbol;
			var active = _props.active;

			var linkClassName = (0, _classnames2['default'])('navigation-link', { 'child-active': active });
			var itemClassName = (0, _classnames2['default'])('navigation-item', { 'child-active': active });

			return _react2['default'].createElement(
				'li',
				{ className: itemClassName },
				_react2['default'].createElement(
					_reactRouter.Link,
					{ to: this.props.linkTo, params: { 'splat': this.props.id }, title: name, className: linkClassName },
					symbol && _react2['default'].createElement(_commonIcon2['default'], { symbol: symbol }),
					name
				),
				this.props.children
			);
		}
	}], [{
		key: 'defaultProps',
		value: {
			'active': false,
			'linkTo': 'pattern'
		},
		enumerable: true
	}]);

	return NavigationItem;
})(_react2['default'].Component);

exports['default'] = NavigationItem;
module.exports = exports['default'];