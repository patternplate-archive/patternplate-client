'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _navigationTree = require('./navigation-tree');

var _navigationTree2 = _interopRequireDefault(_navigationTree);

var _navigationItem = require('./navigation-item');

var _navigationItem2 = _interopRequireDefault(_navigationItem);

var _commonIcon = require('../common/icon');

var _commonIcon2 = _interopRequireDefault(_commonIcon);

var Navigation = (function (_React$Component) {
	function Navigation() {
		var _this = this;

		_classCallCheck(this, Navigation);

		_get(Object.getPrototypeOf(Navigation.prototype), 'constructor', this).apply(this, arguments);

		this.displayName = 'Navigation';
		this.state = {
			expanded: true
		};

		this.toggleMode = function (e) {
			e.preventDefault();
			_this.setState({ expanded: !_this.state.expanded });
		};
	}

	_inherits(Navigation, _React$Component);

	_createClass(Navigation, [{
		key: 'render',
		value: function render() {
			var className = (0, _classnames2['default'])('navigation', { 'slim': !this.state.expanded });
			return _react2['default'].createElement(
				'nav',
				{ className: className },
				_react2['default'].createElement(
					_navigationTree2['default'],
					{ data: this.props.navigation, path: this.props.path, config: this.props.config },
					_react2['default'].createElement(_navigationItem2['default'], { name: 'Home', id: 0, key: 'root', linkTo: '/' })
				),
				_react2['default'].createElement(
					'button',
					{ className: 'toggleMode', onClick: this.toggleMode },
					this.state.expanded ? _react2['default'].createElement(_commonIcon2['default'], { symbol: 'arrow-double-left' }) : _react2['default'].createElement(_commonIcon2['default'], { symbol: 'arrow-double-right' })
				)
			);
		}
	}]);

	return Navigation;
})(_react2['default'].Component);

exports['default'] = Navigation;
module.exports = exports['default'];