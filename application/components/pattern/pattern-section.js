'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _es6Promise = require('es6-promise');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactLibReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var _reactLibReactCSSTransitionGroup2 = _interopRequireDefault(_reactLibReactCSSTransitionGroup);

var _stringHumanize = require('string-humanize');

var _stringHumanize2 = _interopRequireDefault(_stringHumanize);

require('isomorphic-fetch');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _patternLoader = require('./pattern-loader');

var _patternLoader2 = _interopRequireDefault(_patternLoader);

var _commonHeadline = require('../common/headline');

var _commonHeadline2 = _interopRequireDefault(_commonHeadline);

var _commonIcon = require('../common/icon');

var _commonIcon2 = _interopRequireDefault(_commonIcon);

var _utilsAugmentHierarchy = require('../../utils/augment-hierarchy');

var _utilsAugmentHierarchy2 = _interopRequireDefault(_utilsAugmentHierarchy);

(0, _es6Promise.polyfill)();

var PatternSection = (function (_React$Component) {
	function PatternSection() {
		_classCallCheck(this, PatternSection);

		_get(Object.getPrototypeOf(PatternSection.prototype), 'constructor', this).apply(this, arguments);

		this.displayName = 'PatternSection';
		this.state = { 'data': null, 'error': false, 'type': null };
	}

	_inherits(PatternSection, _React$Component);

	_createClass(PatternSection, [{
		key: 'get',
		value: function get(navigation, id) {
			var splits, last, folder, type, url, response, data, message, _data;

			return regeneratorRuntime.async(function get$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						splits = id.split('/');
						last = splits.pop();
						folder = splits.reduce(function (folder, pathItem) {
							return folder[pathItem].children;
						}, navigation);
						type = folder && folder[last].type || 'pattern';

						if (!(type == 'folder')) {
							context$2$0.next = 7;
							break;
						}

						this.setState({ 'data': folder[last], 'error': false, 'type': 'folder' });
						return context$2$0.abrupt('return');

					case 7:
						url = '/api/pattern/' + id;
						response = undefined;
						data = undefined;
						context$2$0.prev = 10;
						context$2$0.next = 13;
						return regeneratorRuntime.awrap(fetch(url, { 'headers': { 'Accept': 'application/json' }, 'credentials': 'include' }));

					case 13:
						response = context$2$0.sent;
						context$2$0.next = 21;
						break;

					case 16:
						context$2$0.prev = 16;
						context$2$0.t0 = context$2$0['catch'](10);

						this.setState({ 'data': null, 'error': true, 'type': null });
						this.props.eventEmitter.emit('error', context$2$0.t0.message + ' ' + url);
						return context$2$0.abrupt('return');

					case 21:
						if (!(this.state.data !== null)) {
							context$2$0.next = 23;
							break;
						}

						return context$2$0.abrupt('return');

					case 23:
						context$2$0.prev = 23;

						if (!(response.status >= 400)) {
							context$2$0.next = 37;
							break;
						}

						message = undefined;
						context$2$0.prev = 26;
						context$2$0.next = 29;
						return regeneratorRuntime.awrap(response.json());

					case 29:
						_data = context$2$0.sent;

						message = _data.message || response.statusText;
						context$2$0.next = 36;
						break;

					case 33:
						context$2$0.prev = 33;
						context$2$0.t1 = context$2$0['catch'](26);

						message = response.statusText + ' ' + url;

					case 36:
						throw new Error(message);

					case 37:
						context$2$0.next = 44;
						break;

					case 39:
						context$2$0.prev = 39;
						context$2$0.t2 = context$2$0['catch'](23);

						this.setState({ 'data': null, 'error': true, 'type': null });
						this.props.eventEmitter.emit('error', '' + context$2$0.t2.message);
						return context$2$0.abrupt('return');

					case 44:
						context$2$0.prev = 44;
						context$2$0.next = 47;
						return regeneratorRuntime.awrap(response.json());

					case 47:
						data = context$2$0.sent;
						context$2$0.next = 54;
						break;

					case 50:
						context$2$0.prev = 50;
						context$2$0.t3 = context$2$0['catch'](44);

						this.setState({ 'data': null, 'error': true, 'type': null });
						this.props.eventEmitter.emit('error', 'Could not parse data for ' + url);

					case 54:

						this.setState({ 'data': data, 'error': false, 'type': 'pattern' });

					case 55:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this, [[10, 16], [23, 39], [26, 33], [44, 50]]);
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.setState({
				'data': this.props.data,
				'type': 'pattern'
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (!this.state.data) {
				this.get(this.props.navigation, this.props.id);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(props) {
			this.setState({ 'data': null, 'type': 'pattern' });
			this.get(props.navigation, props.id);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this = this;

			var _state = this.state;
			var type = _state.type;
			var data = _state.data;

			if (type == 'folder') {
				var _getAugmentedChildren = (0, _utilsAugmentHierarchy2['default'])(data.children, this.props.config.hierarchy);

				var folders = _getAugmentedChildren.folders;
				var patterns = _getAugmentedChildren.patterns;

				var rows = Object.values(folders.concat(patterns)).map(function (child) {
					var type = child.type;
					var displayName = child.displayName;
					var id = child.id;

					var link = '/pattern/' + id;

					if (type == 'pattern') {

						return _react2['default'].createElement(
							'tr',
							{ key: id },
							_react2['default'].createElement(
								'td',
								null,
								_react2['default'].createElement(_commonIcon2['default'], { symbol: 'pattern' })
							),
							_react2['default'].createElement(
								'td',
								null,
								_react2['default'].createElement(
									_reactRouter.Link,
									{ to: link },
									displayName
								)
							),
							_react2['default'].createElement(
								'td',
								null,
								child.manifest.version
							),
							_react2['default'].createElement(
								'td',
								null,
								_react2['default'].createElement(
									_reactRouter.Link,
									{ to: link },
									'Show pattern'
								)
							),
							_react2['default'].createElement(
								'td',
								null,
								_react2['default'].createElement(
									'a',
									{ href: '/demo/' + id, target: '_blank' },
									'Fullscreen'
								)
							)
						);
					} else {

						return _react2['default'].createElement(
							'tr',
							{ key: id },
							_react2['default'].createElement(
								'td',
								null,
								_react2['default'].createElement(_commonIcon2['default'], { symbol: type })
							),
							_react2['default'].createElement(
								'td',
								{ colSpan: 4 },
								_react2['default'].createElement(
									_reactRouter.Link,
									{ to: link },
									displayName
								)
							)
						);
					}
				});

				var up = '/pattern/' + data.id.split('/').slice(0, -1).join('/');

				return _react2['default'].createElement(
					'table',
					{ className: 'pattern-folder' },
					_react2['default'].createElement(
						'thead',
						null,
						_react2['default'].createElement(
							'tr',
							null,
							_react2['default'].createElement('th', { width: 10 }),
							_react2['default'].createElement(
								'th',
								null,
								'Title'
							),
							_react2['default'].createElement(
								'th',
								null,
								'Version'
							),
							_react2['default'].createElement('th', { width: 50 }),
							_react2['default'].createElement('th', { width: 50 })
						)
					),
					_react2['default'].createElement(
						'tbody',
						null,
						_react2['default'].createElement(
							'tr',
							{ id: 'up!' },
							_react2['default'].createElement(
								'td',
								null,
								_react2['default'].createElement(_commonIcon2['default'], { symbol: 'folder' })
							),
							_react2['default'].createElement(
								'td',
								{ title: 'Folder up' },
								_react2['default'].createElement(
									_reactRouter.Link,
									{ to: up },
									'..'
								)
							),
							_react2['default'].createElement('td', null),
							_react2['default'].createElement('td', null),
							_react2['default'].createElement('td', null)
						),
						rows
					)
				);
			} else if (type == 'pattern') {
				var content = 'Not found.';

				var frags = this.props.id ? this.props.id.split('/') : [];
				frags = frags.length > 1 ? frags.slice(0, frags.length - 1) : frags;

				var loader = data ? '' : _react2['default'].createElement(_patternLoader2['default'], _extends({}, this.state, { key: 'loader' }));

				if (data) {
					data = Array.isArray(data) ? data : [data];
					content = data.map(function (item) {
						return _react2['default'].createElement(_index2['default'], _extends({}, item, { key: item.id, config: _this.props.config }));
					});
				}

				return _react2['default'].createElement(
					'section',
					{ className: 'pattern-section' },
					_react2['default'].createElement(
						_reactLibReactCSSTransitionGroup2['default'],
						{ component: 'div', transitionName: 'pattern-content-transition', transitionEnter: false },
						loader
					),
					content
				);
			}

			return _react2['default'].createElement(
				'span',
				null,
				'No type: ',
				type
			);
		}
	}], [{
		key: 'propTypes',
		value: {
			'id': _react.PropTypes.string.isRequired
		},
		enumerable: true
	}]);

	return PatternSection;
})(_react2['default'].Component);

exports['default'] = PatternSection;
module.exports = exports['default'];

// check if this is a pattern or folder

// Try to get a meaningfull error message