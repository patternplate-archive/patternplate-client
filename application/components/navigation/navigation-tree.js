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

var _navigationItem = require('./navigation-item');

var _navigationItem2 = _interopRequireDefault(_navigationItem);

var NavigationTree = (function (_React$Component) {
	function NavigationTree() {
		_classCallCheck(this, NavigationTree);

		if (_React$Component != null) {
			_React$Component.apply(this, arguments);
		}

		this.displayName = 'NavigationTree';
	}

	_inherits(NavigationTree, _React$Component);

	_createClass(NavigationTree, [{
		key: 'render',
		value: function render() {
			var _this = this;

			var children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
			children = children.filter(function (item) {
				return item;
			});

			children = children.map(function (child) {
				return _react2['default'].cloneElement(child);
			});

			var activePath = this.props.path.split('/').slice(2);

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = Object.keys(this.props.data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var keyName = _step.value;

					var sub = this.props.data[keyName];

					if (typeof sub === 'object') {
						var treeId = keyName.toLowerCase();
						var treeFragments = treeId.split('/');
						var depth = treeFragments.length;
						var active = treeFragments[depth - 1] === activePath[depth - 1];

						children.push(_react2['default'].createElement(
							_navigationItem2['default'],
							{ name: keyName, id: treeId, key: treeId, active: active },
							_react2['default'].createElement(NavigationTree, { data: sub, id: treeId, path: this.props.path })
						));
					} else {
						var childId = [this.props.id, keyName].join('/');
						children.push(_react2['default'].createElement(_navigationItem2['default'], { name: sub, id: childId, key: childId }));
					}
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

			if (this.props.config) {
				children.sort(function (a, b) {
					return _this.props.config.menuOrder.indexOf(a.props.name) - _this.props.config.menuOrder.indexOf(b.props.name);
				});
			}

			return _react2['default'].createElement(
				'ul',
				{ className: 'navigation-tree' },
				children
			);
		}
	}]);

	return NavigationTree;
})(_react2['default'].Component);

exports['default'] = NavigationTree;
module.exports = exports['default'];