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

var _commonFrame = require('../common/frame');

var _commonFrame2 = _interopRequireDefault(_commonFrame);

var PatternDemo = (function (_React$Component) {
	function PatternDemo() {
		_classCallCheck(this, PatternDemo);

		if (_React$Component != null) {
			_React$Component.apply(this, arguments);
		}
	}

	_inherits(PatternDemo, _React$Component);

	_createClass(PatternDemo, [{
		key: 'render',
		value: function render() {
			var source = '' + this.props.base + '/' + this.props.target;
			var id = '' + source + '-demo';

			return _react2['default'].createElement(
				'div',
				{ className: 'pattern-demo-container' },
				_react2['default'].createElement(_commonFrame2['default'], { className: 'pattern-demo', src: source, id: source, sandbox: 'allow-same-origin allow-scripts allow-forms allow-scripts' })
			);
		}
	}], [{
		key: 'displayName',
		value: 'PatternDemo',
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {
			'base': '/demo'
		},
		enumerable: true
	}]);

	return PatternDemo;
})(_react2['default'].Component);

exports['default'] = PatternDemo;
module.exports = exports['default'];