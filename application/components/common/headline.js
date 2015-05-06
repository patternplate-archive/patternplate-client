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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Headline = (function (_React$Component) {
	function Headline() {
		_classCallCheck(this, Headline);

		if (_React$Component != null) {
			_React$Component.apply(this, arguments);
		}

		this.displayName = 'Headline';
	}

	_inherits(Headline, _React$Component);

	_createClass(Headline, [{
		key: 'render',
		value: function render() {
			var TagName = 'h' + this.props.order;
			var className = _classnames2['default']('h', 'h' + (this.props.display || this.props.order), this.props.className);

			return _react2['default'].createElement(
				TagName,
				{ className: className },
				this.props.children
			);
		}
	}], [{
		key: 'defaultProps',
		value: {
			'children': 'Headline',
			'order': 1
		},
		enumerable: true
	}, {
		key: 'propTypes',
		value: {
			'children': _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.array]).isRequired,
			'order': _react.PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
			'display': _react.PropTypes.oneOf([1, 2, 3, 4, 5, 6])
		},
		enumerable: true
	}]);

	return Headline;
})(_react2['default'].Component);

exports['default'] = Headline;
module.exports = exports['default'];