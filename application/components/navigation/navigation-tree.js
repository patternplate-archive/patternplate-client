'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _navigationItem = require('./navigation-item');

var _navigationItem2 = _interopRequireDefault(_navigationItem);

var _utilsAugmentHierarchy = require('../../utils/augment-hierarchy');

var _utilsAugmentHierarchy2 = _interopRequireDefault(_utilsAugmentHierarchy);

var NavigationTree = (function (_React$Component) {
	function NavigationTree() {
		_classCallCheck(this, NavigationTree);

		_get(Object.getPrototypeOf(NavigationTree.prototype), 'constructor', this).apply(this, arguments);

		this.displayName = 'NavigationTree';
	}

	_inherits(NavigationTree, _React$Component);

	_createClass(NavigationTree, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var data = _props.data;
			var path = _props.path;
			var children = _props.children;
			var config = _props.config;

			var _getAugmentedChildren = (0, _utilsAugmentHierarchy2['default'])(data, config.hierarchy);

			var folders = _getAugmentedChildren.folders;
			var patterns = _getAugmentedChildren.patterns;

			folders = folders.map(function (folder) {
				var currentPath = path.split('/');
				var folderPath = folder.id.split('/');
				var active = (0, _deepEqual2['default'])(currentPath.slice(2, 2 + folderPath.length), folderPath);

				return _react2['default'].createElement(
					_navigationItem2['default'],
					{ name: folder.displayName, symbol: folder.icon, id: folder.id, key: folder.id, active: active },
					_react2['default'].createElement(NavigationTree, { path: path, config: config, data: folder.children, id: folder.id })
				);
			});

			patterns = patterns.map(function (pattern) {
				return _react2['default'].createElement(_navigationItem2['default'], { name: pattern.displayName, id: pattern.id, key: pattern.id, symbol: pattern.type });
			});

			var external = Array.isArray(children) ? children : [children];
			external = external.filter(function (item) {
				return item;
			});
			external = external.map(function (child) {
				return _react2['default'].cloneElement(child);
			});

			return _react2['default'].createElement(
				'ul',
				{ className: 'navigation-tree' },
				external,
				folders,
				patterns
			);
		}
	}]);

	return NavigationTree;
})(_react2['default'].Component);

exports['default'] = NavigationTree;
module.exports = exports['default'];