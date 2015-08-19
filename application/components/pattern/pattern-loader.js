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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _commonIcon = require('../common/icon');

var _commonIcon2 = _interopRequireDefault(_commonIcon);

var PatternLoader = (function (_React$Component) {
	function PatternLoader() {
		_classCallCheck(this, PatternLoader);

		_get(Object.getPrototypeOf(PatternLoader.prototype), 'constructor', this).apply(this, arguments);

		this.displayName = 'PatternLoader';
	}

	_inherits(PatternLoader, _React$Component);

	_createClass(PatternLoader, [{
		key: 'render',
		value: function render() {
			var className = (0, _classnames2['default'])('pattern-loader', {
				'pattern-error': this.props.error
			});

			var symbol = this.props.error ? 'patternplate' : 'patternplate-loading';

			return _react2['default'].createElement(
				'div',
				{ className: className },
				_react2['default'].createElement(
					_commonIcon2['default'],
					{ inline: true, symbol: symbol },
					'Loading ...'
				)
			);
		}
	}], [{
		key: 'defaultProps',
		value: {
			'error': false
		},
		enumerable: true
	}, {
		key: 'propTypes',
		value: {
			'error': _react.PropTypes.bool.isRequired
		},
		enumerable: true
	}]);

	return PatternLoader;
})(_react2['default'].Component);

exports['default'] = PatternLoader;
module.exports = exports['default'];