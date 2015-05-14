'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

_es6Promise.polyfill();

var PatternSection = (function (_React$Component) {
	function PatternSection() {
		_classCallCheck(this, PatternSection);

		if (_React$Component != null) {
			_React$Component.apply(this, arguments);
		}

		this.displayName = 'PatternSection';
		this.state = { 'data': null, 'error': false };
	}

	_inherits(PatternSection, _React$Component);

	_createClass(PatternSection, [{
		key: 'get',
		value: function get(id) {
			var force = arguments[1] === undefined ? false : arguments[1];
			var response, data;
			return regeneratorRuntime.async(function get$(context$2$0) {
				while (1) switch (context$2$0.prev = context$2$0.next) {
					case 0:
						context$2$0.prev = 0;
						context$2$0.next = 3;
						return fetch('/api/pattern/' + id, { 'headers': { 'accept-type': 'application/json' } });

					case 3:
						response = context$2$0.sent;

						if (!(this.state.data !== null)) {
							context$2$0.next = 6;
							break;
						}

						return context$2$0.abrupt('return');

					case 6:
						context$2$0.next = 8;
						return response.json();

					case 8:
						data = context$2$0.sent;

						if (!(response.status >= 400 || data.err)) {
							context$2$0.next = 11;
							break;
						}

						throw new Error(data.message, data.err);

					case 11:

						this.setState({ 'data': data, 'error': false });
						context$2$0.next = 18;
						break;

					case 14:
						context$2$0.prev = 14;
						context$2$0.t0 = context$2$0['catch'](0);

						this.setState({ 'data': null, 'error': true });
						this.props.eventEmitter.emit('error', '' + context$2$0.t0.message + ' ' + this.props.id);

					case 18:
					case 'end':
						return context$2$0.stop();
				}
			}, null, this, [[0, 14]]);
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
			var content;

			var frags = this.props.id ? this.props.id.split('/') : [];
			frags = frags.length > 1 ? frags.slice(0, frags.length - 1) : frags;

			var name = frags.map(function (fragment) {
				return _stringHumanize2['default'](fragment);
			}).join(' ');
			var loader = this.state.data ? '' : _react2['default'].createElement(_patternLoader2['default'], _extends({}, this.state, { key: 'loader' }));

			if (this.state.data) {
				var data = Array.isArray(this.state.data) ? this.state.data : [this.state.data];
				content = data.map(function (item) {
					return _react2['default'].createElement(_index2['default'], _extends({}, item, { key: item.id }));
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