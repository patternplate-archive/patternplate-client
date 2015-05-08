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

var _prettyData = require('pretty-data');

var PatternCode = (function (_React$Component) {
	function PatternCode() {
		_classCallCheck(this, PatternCode);

		if (_React$Component != null) {
			_React$Component.apply(this, arguments);
		}

		this.displayName = 'PatternCode';
	}

	_inherits(PatternCode, _React$Component);

	_createClass(PatternCode, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			PatternCode.highlight(this);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			PatternCode.highlight(this);
		}
	}, {
		key: 'onCopyClick',
		value: function onCopyClick(e) {
			PatternCode.clipboard(this);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this = this;

			var pretty = PatternCode.pretty(this);

			return _react2['default'].createElement(
				'div',
				{ className: 'pattern-code' },
				_react2['default'].createElement(
					'div',
					{ className: 'pattern-code-toolbar' },
					_react2['default'].createElement(
						'div',
						{ className: 'pattern-code-name' },
						this.props.name
					),
					_react2['default'].createElement(
						'div',
						{ className: 'pattern-code-tools' },
						_react2['default'].createElement(
							'button',
							{ type: 'button', onClick: function (e) {
									return _this.onCopyClick(e);
								} },
							'Copy'
						)
					)
				),
				_react2['default'].createElement(
					'pre',
					null,
					_react2['default'].createElement(
						'code',
						{ className: this.props.format },
						pretty
					)
				),
				_react2['default'].createElement('textarea', { className: 'clipboard', value: pretty, readOnly: true })
			);
		}
	}], [{
		key: 'defaultProps',
		value: {
			'format': 'html' },
		enumerable: true
	}, {
		key: 'propTypes',
		value: {
			'children': _react.PropTypes.string.isRequired,
			'format': _react.PropTypes.string,
			'name': _react.PropTypes.string.isRequired
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
	}, {
		key: 'clipboard',
		value: function clipboard(component) {
			var el = _react.findDOMNode(component).querySelector('.clipboard');
			el.focus();
			el.select();

			var result = document.execCommand('copy');
			console.log(result);
		}
	}, {
		key: 'pretty',
		value: function pretty(component) {
			if (component.props.format !== 'html') {
				return component.props.children;
			}
			return _prettyData.pd.xml(component.props.children);
		}
	}]);

	return PatternCode;
})(_react2['default'].Component);

exports['default'] = PatternCode;
module.exports = exports['default'];