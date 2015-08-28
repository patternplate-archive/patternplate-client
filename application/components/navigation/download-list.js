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

var Toolbar = (function (_React$Component) {
	_inherits(Toolbar, _React$Component);

	function Toolbar() {
		_classCallCheck(this, Toolbar);

		_get(Object.getPrototypeOf(Toolbar.prototype), 'constructor', this).apply(this, arguments);

		this.displayName = 'Toolbar';
	}

	_createClass(Toolbar, [{
		key: 'render',
		value: function render() {
			var items = (this.props.items || []).map(function (item) {
				return _react2['default'].createElement(
					'option',
					{ key: item.path, value: encodeURIComponent(item.path) },
					item.version,
					' - ',
					item.environment,
					' - ',
					item.revision
				);
			});
			var available = items.length > 0;

			var display = undefined;

			if (available) {
				display = _react2['default'].createElement(
					'label',
					{ className: 'download-select' },
					_react2['default'].createElement(
						'select',
						{ name: 'path' },
						items
					)
				);
			} else {
				display = _react2['default'].createElement(
					'span',
					{ className: 'download-select' },
					'No builds available'
				);
			}

			return _react2['default'].createElement(
				'form',
				{ target: '_blank', method: 'get', action: '/api/build/', className: 'download-list' },
				display,
				_react2['default'].createElement(
					'button',
					{ className: 'download-button', type: 'submit', disabled: !available },
					'Download'
				)
			);
		}
	}], [{
		key: 'defaultProps',
		value: {
			items: []
		},
		enumerable: true
	}]);

	return Toolbar;
})(_react2['default'].Component);

exports['default'] = Toolbar;
module.exports = exports['default'];