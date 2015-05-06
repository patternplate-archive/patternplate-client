'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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

var resultMap = {
	'Documentation': 'buffer',
	'Markup': 'buffer',
	'Script': 'demoSource',
	'Style': 'source'
};

var formatMap = {
	'source': 'in',
	'buffer': 'out',
	'demoSource': 'in',
	'demoBuffer': 'out'
};

var Pattern = (function (_React$Component) {
	function Pattern() {
		_classCallCheck(this, Pattern);

		if (_React$Component != null) {
			_React$Component.apply(this, arguments);
		}

		this.displayName = 'Pattern';
		this.state = {
			'active': []
		};
	}

	_inherits(Pattern, _React$Component);

	_createClass(Pattern, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.items = Pattern.comprehend(this.props.results, this.props.id);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(props) {
			this.items = Pattern.comprehend(props.results, props.id);
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
			var ids = arguments[0] === undefined ? this.state.active : arguments[0];

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
			var _this = this;

			var results = [];
			var controls = [];
			var content = undefined;

			var fullscreen = '/demo/' + this.props.id;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;

					var isDoc = item.format === 'html' && item.name === 'Documentation';
					var isActive = this.state.active.indexOf(item.id) > -1;

					if (item.content.length === 0) {
						continue;
					}

					results.push(_react2['default'].createElement('input', { className: 'pattern-state', type: 'checkbox', id: item.id, key: item.controlKey, checked: isActive, onChange: function (e) {
							return _this.onControlChange(e);
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

			return _react2['default'].createElement(
				'div',
				{ className: 'pattern' },
				_react2['default'].createElement(
					_commonHeadline2['default'],
					{ className: 'pattern-header', order: 2 },
					_react2['default'].createElement(
						'span',
						{ className: 'pattern-name' },
						this.props.manifest.name
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
						_moment2['default'](new Date(this.props.mtime)).fromNow()
					)
				),
				_react2['default'].createElement(_patternDemo2['default'], { target: this.props.id }),
				_react2['default'].createElement(
					'div',
					{ className: 'pattern-toolbar' },
					controls,
					_react2['default'].createElement(
						'button',
						{ className: 'pattern-control pattern-tool', type: 'button',
							onClick: function (e) {
								return _this.onCloseClick(e);
							},
							disabled: this.state.active.length === 0 },
						'Close all'
					),
					_react2['default'].createElement(
						'a',
						{ className: 'pattern-control pattern-tool', href: fullscreen, target: '_blank' },
						'Fullscreen'
					)
				),
				_react2['default'].createElement(
					'div',
					{ className: 'pattern-content' },
					results
				)
			);
		}
	}], [{
		key: 'comprehend',
		value: function comprehend(results, id) {
			var items = [];

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = Object.keys(results)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var resultName = _step2.value;

					var result = results[resultName];
					var contentKey = resultMap[resultName];
					var formatKey = formatMap[contentKey];
					var _name = resultName.toLowerCase();

					if (typeof result !== 'object' || typeof contentKey === 'undefined') {
						continue;
					}

					items.push({
						'name': resultName,
						'key': [id, _name].join('/'),
						'controlKey': [id, _name, 'control'].join('/'),
						'id': [id, _name].join('/'),
						'format': result[formatKey] || 'html',
						'content': result[contentKey]
					});
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

			return items;
		}
	}]);

	return Pattern;
})(_react2['default'].Component);

exports['default'] = Pattern;
module.exports = exports['default'];