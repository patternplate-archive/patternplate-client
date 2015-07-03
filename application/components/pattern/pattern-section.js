'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _es6Promise = require('es6-promise');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

(0, _es6Promise.polyfill)();

var PatternSection = (function (_React$Component) {
	function PatternSection() {
		_classCallCheck(this, PatternSection);

		_get(Object.getPrototypeOf(PatternSection.prototype), 'constructor', this).apply(this, arguments);

		this.displayName = 'PatternSection';
		this.state = { 'data': null, 'error': false };
	}

	_inherits(PatternSection, _React$Component);

	_createClass(PatternSection, [{
		key: 'get',
		value: function get(id) {
			var force = arguments[1] === undefined ? false : arguments[1];

			var response, data, url, message, _data;

			return regeneratorRuntime.async(function get$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						response = undefined;
						data = undefined;
						url = '/api/pattern/' + id;
						context$2$0.prev = 3;
						context$2$0.next = 6;
						return regeneratorRuntime.awrap(fetch(url, { 'headers': { 'Accept': 'application/json' }, 'credentials': 'include' }));

					case 6:
						response = context$2$0.sent;
						context$2$0.next = 14;
						break;

					case 9:
						context$2$0.prev = 9;
						context$2$0.t0 = context$2$0['catch'](3);

						this.setState({ 'data': null, 'error': true });
						this.props.eventEmitter.emit('error', context$2$0.t0.message + ' ' + url);
						return context$2$0.abrupt('return');

					case 14:
						if (!(this.state.data !== null)) {
							context$2$0.next = 16;
							break;
						}

						return context$2$0.abrupt('return');

					case 16:
						context$2$0.prev = 16;

						if (!(response.status >= 400)) {
							context$2$0.next = 30;
							break;
						}

						message = undefined;
						context$2$0.prev = 19;
						context$2$0.next = 22;
						return regeneratorRuntime.awrap(response.json());

					case 22:
						_data = context$2$0.sent;

						message = _data.message || response.statusText;
						context$2$0.next = 29;
						break;

					case 26:
						context$2$0.prev = 26;
						context$2$0.t1 = context$2$0['catch'](19);

						message = response.statusText + ' ' + url;

					case 29:
						throw new Error(message);

					case 30:
						context$2$0.next = 37;
						break;

					case 32:
						context$2$0.prev = 32;
						context$2$0.t2 = context$2$0['catch'](16);

						this.setState({ 'data': null, 'error': true });
						this.props.eventEmitter.emit('error', '' + context$2$0.t2.message);
						return context$2$0.abrupt('return');

					case 37:
						context$2$0.prev = 37;
						context$2$0.next = 40;
						return regeneratorRuntime.awrap(response.json());

					case 40:
						data = context$2$0.sent;
						context$2$0.next = 47;
						break;

					case 43:
						context$2$0.prev = 43;
						context$2$0.t3 = context$2$0['catch'](37);

						this.setState({ 'data': null, 'error': true });
						this.props.eventEmitter.emit('error', 'Could not parse data for ' + url);

					case 47:

						this.setState({ 'data': data, 'error': false });

					case 48:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this, [[3, 9], [16, 32], [19, 26], [37, 43]]);
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.setState({
				'data': this.props.data
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (!this.state.data) {
				this.get(this.props.id);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(props) {
			this.setState({ 'data': null });
			this.get(props.id);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this = this;

			var content;

			var frags = this.props.id ? this.props.id.split('/') : [];
			frags = frags.length > 1 ? frags.slice(0, frags.length - 1) : frags;

			var name = frags.map(function (fragment) {
				return (0, _stringHumanize2['default'])(fragment);
			}).join(' ');
			var loader = this.state.data ? '' : _react2['default'].createElement(_patternLoader2['default'], _extends({}, this.state, { key: 'loader' }));

			if (this.state.data) {
				var data = Array.isArray(this.state.data) ? this.state.data : [this.state.data];
				content = data.map(function (item) {
					return _react2['default'].createElement(_index2['default'], _extends({}, item, { key: item.id, config: _this.props.config }));
				});
			} else {
				content = '';
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

// Try to get a meaningfull error message