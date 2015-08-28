'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _commonIcon = require('../common/icon');

var _commonIcon2 = _interopRequireDefault(_commonIcon);

var PatternDependencies = (function (_React$Component) {
	_inherits(PatternDependencies, _React$Component);

	function PatternDependencies() {
		_classCallCheck(this, PatternDependencies);

		_get(Object.getPrototypeOf(PatternDependencies.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(PatternDependencies, [{
		key: 'getManifests',
		value: function getManifests(list) {
			var manifests = [];
			if (list) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = Object.keys(list)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var key = _step.value;

						manifests.push(list[key]);
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
			return manifests;
		}
	}, {
		key: 'render',
		value: function render() {
			var dependencies = this.getManifests(this.props.data.dependencies);
			var dependents = this.getManifests(this.props.data.manifest.dependentPatterns);

			return _react2['default'].createElement(
				'div',
				{ className: 'pattern-dependencies' },
				_react2['default'].createElement(
					'div',
					{ className: 'pattern-dependencies-column' },
					_react2['default'].createElement(
						'div',
						{ className: 'pattern-dependencies-column-headline' },
						'Dependencies'
					),
					_react2['default'].createElement(
						'ul',
						{ className: 'pattern-dependencies-column-content' },
						dependencies.map(function (dependency) {
							return _react2['default'].createElement(
								'li',
								null,
								_react2['default'].createElement(
									'a',
									{ href: '/pattern/' + dependency.id },
									dependency.manifest.displayName || dependency.manifest.name
								)
							);
						})
					)
				),
				_react2['default'].createElement(
					'div',
					{ className: 'pattern-dependencies-column' },
					_react2['default'].createElement(
						'div',
						{ className: 'pattern-dependencies-column-headline' },
						'Pattern'
					),
					_react2['default'].createElement(
						'div',
						{ className: 'pattern-dependencies-column-content' },
						this.props.data.manifest.displayName || this.props.data.manifest.name
					)
				),
				_react2['default'].createElement(
					'div',
					{ className: 'pattern-dependencies-column' },
					_react2['default'].createElement(
						'div',
						{ className: 'pattern-dependencies-column-headline' },
						'Dependent'
					),
					_react2['default'].createElement(
						'ul',
						{ className: 'pattern-dependencies-column-content' },
						dependents.map(function (dependent) {
							return _react2['default'].createElement(
								'li',
								null,
								_react2['default'].createElement(
									'a',
									{ href: '/pattern/' + dependent.id },
									dependent.displayName || dependent.name
								)
							);
						})
					)
				)
			);
		}
	}]);

	return PatternDependencies;
})(_react2['default'].Component);

exports['default'] = PatternDependencies;
module.exports = exports['default'];