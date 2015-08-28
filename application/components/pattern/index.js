'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _patternCode = require('./pattern-code');

var _patternCode2 = _interopRequireDefault(_patternCode);

var _patternDocumentation = require('./pattern-documentation');

var _patternDocumentation2 = _interopRequireDefault(_patternDocumentation);

var _patternControl = require('./pattern-control');

var _patternControl2 = _interopRequireDefault(_patternControl);

var _patternDemo = require('./pattern-demo');

var _patternDemo2 = _interopRequireDefault(_patternDemo);

var _commonHeadline = require('../common/headline');

var _commonHeadline2 = _interopRequireDefault(_commonHeadline);

var _commonIcon = require('../common/icon');

var _commonIcon2 = _interopRequireDefault(_commonIcon);

var formatMap = {
	'source': 'in',
	'buffer': 'out',
	'demoSource': 'in',
	'demoBuffer': 'out'
};

var Pattern = (function (_React$Component) {
	_inherits(Pattern, _React$Component);

	function Pattern() {
		_classCallCheck(this, Pattern);

		_get(Object.getPrototypeOf(Pattern.prototype), 'constructor', this).apply(this, arguments);

		this.displayName = 'Pattern';
		this.state = {
			'active': []
		};
	}

	_createClass(Pattern, [{
		key: 'comprehend',
		value: function comprehend(results, id) {
			var _this = this;

			var items = [];

			if (!results) {
				return [];
			}

			if (!results.index) {
				return [];
			}

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				var _loop = function () {
					var resultName = _step.value;

					var resultConfig = _this.props.config.results[resultName];

					if (!resultConfig) {
						return 'continue';
					}

					var result = results.index[resultName];
					var name = resultConfig.name || resultName;
					var keys = resultConfig.use;
					keys = Array.isArray(keys) ? keys : [keys];
					var contentKey = keys.filter(function (key) {
						return result[key];
					})[0];

					var formatKey = formatMap[contentKey];

					if (typeof result !== 'object' || typeof contentKey === 'undefined') {
						return 'continue';
					}

					items.push({
						'name': name,
						'key': [id, name].join('/'),
						'controlKey': [id, name, 'control'].join('/'),
						'id': [id, name].join('/'),
						'format': result[formatKey] || 'html',
						'content': result[contentKey]
					});
				};

				for (var _iterator = Object.keys(results.index)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _ret = _loop();

					if (_ret === 'continue') continue;
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

			return items;
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.items = this.comprehend(this.props.results, this.props.id);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(props) {
			this.items = this.comprehend(props.results, props.id);
		}
	}, {
		key: 'updateControls',
		value: function updateControls(id, checked) {
			var active = this.state.active.slice(0);
			var index = active.indexOf(id);

			if (checked && index === -1) {
				active.push(id);
			} else if (index !== -1) {
				active.splice(index, 1);
			}

			this.setState({
				'active': active
			});
		}
	}, {
		key: 'closeControls',
		value: function closeControls() {
			var ids = arguments.length <= 0 || arguments[0] === undefined ? this.state.active : arguments[0];

			var diff = this.state.active.filter(function (id) {
				return ids.indexOf(id) === -1;
			});

			this.setState({
				'active': diff
			});
		}
	}, {
		key: 'onControlChange',
		value: function onControlChange(e) {
			this.updateControls(e.target.id, e.target.checked);
		}
	}, {
		key: 'onCloseClick',
		value: function onCloseClick() {
			this.closeControls();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var results = [];
			var controls = [];

			var fullscreen = '/demo/' + this.props.id;

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var item = _step2.value;

					var isDoc = item.format === 'html' && (item.name === 'Documentation' || item.name === 'Dependencies');
					var isActive = this.state.active.indexOf(item.id) > -1;

					if (item.content.length === 0) {
						continue;
					}

					results.push(_react2['default'].createElement('input', { className: 'pattern-state', type: 'checkbox', id: item.id, key: item.controlKey, checked: isActive, onChange: function (e) {
							return _this2.onControlChange(e);
						} }));
					results.push(isDoc ? _react2['default'].createElement(
						_patternDocumentation2['default'],
						item,
						item.content
					) : _react2['default'].createElement(
						_patternCode2['default'],
						item,
						item.content
					));
					controls.push(_react2['default'].createElement(_patternControl2['default'], _extends({}, item, { id: item.controlKey, key: item.controlKey, target: item.key, active: isActive })));
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2['return']) {
						_iterator2['return']();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			var allowFullscreen = this.props.config.fullscreenPatterns.every(function (rule) {
				return !_this2.props.id.match(new RegExp(rule));
			});

			var content = undefined;

			if (allowFullscreen) {
				content = _react2['default'].createElement(_patternDemo2['default'], { target: this.props.id });
			} else {
				content = _react2['default'].createElement(
					'div',
					{ className: 'pattern-fullscreen-message' },
					"This pattern is disabled in embedded view. Please open the ",
					_react2['default'].createElement(
						'a',
						{ href: fullscreen, target: '_blank' },
						'fullscreen view'
					),
					" to display it."
				);
			}

			return _react2['default'].createElement(
				'div',
				{ className: 'pattern' },
				_react2['default'].createElement(
					_commonHeadline2['default'],
					{ className: 'pattern-header', order: 2 },
					_react2['default'].createElement(
						'span',
						{ className: 'pattern-name' },
						this.props.manifest.displayName || this.props.manifest.name
					),
					_react2['default'].createElement(
						'small',
						{ className: 'pattern-version' },
						'v',
						this.props.manifest.version
					),
					_react2['default'].createElement(
						'small',
						{ className: 'pattern-lastmodified' },
						'Last modified: ',
						(0, _moment2['default'])(new Date(this.props.mtime)).fromNow()
					)
				),
				content,
				_react2['default'].createElement(
					'div',
					{ className: 'pattern-toolbar' },
					controls,
					_react2['default'].createElement(
						'button',
						{ className: 'pattern-control pattern-tool', type: 'button',
							onClick: function (e) {
								return _this2.onCloseClick(e);
							},
							disabled: this.state.active.length === 0 },
						'Close all'
					),
					_react2['default'].createElement(
						'a',
						{ className: 'pattern-control pattern-tool', href: fullscreen, target: '_blank' },
						_react2['default'].createElement(_commonIcon2['default'], { symbol: 'fullscreen' })
					)
				),
				_react2['default'].createElement(
					'div',
					{ className: 'pattern-content' },
					results
				)
			);
		}
	}]);

	return Pattern;
})(_react2['default'].Component);

exports['default'] = Pattern;
module.exports = exports['default'];