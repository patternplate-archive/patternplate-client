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

var PatternControl = (function (_React$Component) {
	function PatternControl() {
		_classCallCheck(this, PatternControl);

		if (_React$Component != null) {
			_React$Component.apply(this, arguments);
		}

		this.displayName = 'PatternControl';
	}

	_inherits(PatternControl, _React$Component);

	_createClass(PatternControl, [{
		key: 'render',
		value: function render() {
			var className = (0, _classnames2['default'])('pattern-control', {
				'active': this.props.active
			});

			return _react2['default'].createElement(
				'label',
				{ className: className, htmlFor: this.props.target },
				this.props.name
			);
		}
	}]);

	return PatternControl;
})(_react2['default'].Component);

exports['default'] = PatternControl;
module.exports = exports['default'];