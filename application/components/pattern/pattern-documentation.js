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

var _highlightJs = require('highlight.js');

var _highlightJs2 = _interopRequireDefault(_highlightJs);

var _commonHeadline = require('../common/headline');

var _commonHeadline2 = _interopRequireDefault(_commonHeadline);

var PatternDocumentation = (function (_React$Component) {
	function PatternDocumentation() {
		_classCallCheck(this, PatternDocumentation);

		if (_React$Component != null) {
			_React$Component.apply(this, arguments);
		}

		this.displayName = 'PatternDocumentation';
	}

	_inherits(PatternDocumentation, _React$Component);

	_createClass(PatternDocumentation, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			PatternDocumentation.highlight(this);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			PatternDocumentation.highlight(this);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'pattern-documentation' },
				_react2['default'].createElement('div', { className: 'markdown', dangerouslySetInnerHTML: { '__html': this.props.children } })
			);
		}
	}], [{
		key: 'propTypes',
		value: {
			'children': _react.PropTypes.string.isRequired
		},
		enumerable: true
	}, {
		key: 'highlight',
		value: function highlight(component) {
			var selector = arguments[1] === undefined ? 'pre > code' : arguments[1];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = _react.findDOMNode(component).querySelectorAll(selector)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var node = _step.value;

					_highlightJs2['default'].highlightBlock(node);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}]);

	return PatternDocumentation;
})(_react2['default'].Component);

exports['default'] = PatternDocumentation;
module.exports = exports['default'];