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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _navigationItem = require('./navigation-item');

var _navigationItem2 = _interopRequireDefault(_navigationItem);

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
			var _this = this;

			var data = this.props.data;

			var folders = [];
			var patterns = [];

			var children = Object.keys(data).forEach(function (childKey) {
				var child = _this.props.data[childKey];

				if (child.type == 'pattern') {
					patterns.push(child);
				} else if (child.type == 'folder') {
					folders.push(child);
				} else {
					console.warn('Unknown meta hierarchy type "' + child.type + '", skipping.');
				}
			});

			// extract displayName and order from hierarchy config for each folder
			folders = folders.map(function (folder) {
				var splits = folder.id.split('/');
				var key = splits[splits.length - 1];

				var defaultHierarchyEntry = {
					'order': -1, // default order is -1, hence 'unordered' items are on top
					'displayName': key,
					'icon': 'folder' // TODO: add 'folder' default icon
				};

				var hierarchyEntry = _this.props.config.hierarchy[folder.id];

				return _extends({}, folder, defaultHierarchyEntry, hierarchyEntry);
			});

			folders.sort(function (a, b) {
				return a.order == b.order ? a.displayName > b.displayName : a.order > b.order;
			});

			folders = folders.map(function (folder) {
				var currentPath = _this.props.path.split('/');
				var folderPath = folder.id.split('/');
				var active = (0, _deepEqual2['default'])(currentPath.slice(2, 2 + folderPath.length), folderPath);

				return _react2['default'].createElement(
					_navigationItem2['default'],
					{ name: folder.displayName, symbol: folder.icon, id: folder.id, key: folder.id, active: active },
					_react2['default'].createElement(NavigationTree, { path: _this.props.path, config: _this.props.config, data: folder.children, id: folder.id })
				);
			});

			// extract displayName / name from pattern
			patterns = patterns.map(function (pattern) {
				return _extends({}, pattern, {
					displayName: pattern.manifest.displayName || pattern.manifest.name
				});
			});

			patterns.sort(function (a, b) {
				return b.displayName > a.displayName;
			});

			patterns = patterns.map(function (pattern) {
				return _react2['default'].createElement(_navigationItem2['default'], { name: pattern.displayName, id: pattern.id, key: pattern.id, symbol: pattern.type });
			});

			// inject external children (e.g. "Home" item)

			var external = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
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