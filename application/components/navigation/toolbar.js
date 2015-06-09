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

var _reactRouter = require('react-router');

var _commonIcon = require('../common/icon');

var _commonIcon2 = _interopRequireDefault(_commonIcon);

var Toolbar = (function (_React$Component) {
	function Toolbar() {
		_classCallCheck(this, Toolbar);

		if (_React$Component != null) {
			_React$Component.apply(this, arguments);
		}

		this.displayName = 'Toolbar';
		this.state = {
			'theme': 'light',
			'target': 'dark'
		};
	}

	_inherits(Toolbar, _React$Component);

	_createClass(Toolbar, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.link = document.querySelector('[data-application-theme]');
		}
	}, {
		key: 'toggleTheme',
		value: function toggleTheme() {
			var _this = this;

			this.setState({
				'theme': this.state.target,
				'target': this.state.theme
			});

			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = this.link.href.replace(this.state.theme, this.state.target);

			link.onload = function (e) {
				document.head.removeChild(_this.link);
				_this.link = link;
			};

			document.head.appendChild(link);
		}
	}, {
		key: 'onThemeButtonClick',
		value: function onThemeButtonClick() {
			this.toggleTheme();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var themeClassName = (0, _classnames2['default'])('button', this.state.target);

			return _react2['default'].createElement(
				'header',
				{ className: 'header' },
				_react2['default'].createElement(
					_reactRouter.Link,
					{ className: 'logo', to: 'root' },
					_react2['default'].createElement(
						_commonIcon2['default'],
						{ symbol: 'patternplate', fallback: false, inline: true },
						this.props.schema.name
					)
				),
				_react2['default'].createElement(
					'div',
					{ className: 'toolbar' },
					_react2['default'].createElement(
						'label',
						{ className: 'button menu', htmlFor: 'menu-state' },
						_react2['default'].createElement(
							_commonIcon2['default'],
							{ uri: '', symbol: 'patternplate' },
							'Menu'
						)
					),
					_react2['default'].createElement(
						'button',
						{ className: themeClassName, type: 'button', onClick: function (e) {
								return _this2.onThemeButtonClick(e);
							} },
						_react2['default'].createElement(
							_commonIcon2['default'],
							{ symbol: this.state.target },
							this.state.target
						)
					)
				)
			);
		}
	}]);

	return Toolbar;
})(_react2['default'].Component);

exports['default'] = Toolbar;
module.exports = exports['default'];