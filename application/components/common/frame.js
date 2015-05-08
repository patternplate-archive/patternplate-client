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

var _rubberBand = require('rubber-band');

var _utilsIframeWindow = require('../../utils/iframe-window');

var _utilsIframeWindow2 = _interopRequireDefault(_utilsIframeWindow);

var Frame = (function (_Component) {
	function Frame() {
		_classCallCheck(this, Frame);

		if (_Component != null) {
			_Component.apply(this, arguments);
		}

		this.state = {
			'height': 0
		};
	}

	_inherits(Frame, _Component);

	_createClass(Frame, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this = this;

			var frame = _react.findDOMNode(this);
			this.frame = _rubberBand.host(frame, { 'callback': function callback(frame, height) {
					return _this.onFrameResize(height);
				} });
			this.frame.request();
			_utilsIframeWindow2['default'](frame);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.frame.stop();
		}
	}, {
		key: 'onFrameResize',
		value: function onFrameResize(height) {
			this.setState({
				'height': height
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement('iframe', _extends({}, this.props, { key: this.props.id, style: { height: this.state.height } }));
		}
	}], [{
		key: 'displayName',
		value: 'Frame',
		enumerable: true
	}, {
		key: 'propTypes',
		value: {
			'src': _react.PropTypes.string.isRequired,
			'id': _react.PropTypes.string.isRequired
		},
		enumerable: true
	}]);

	return Frame;
})(_react.Component);

exports['default'] = Frame;
module.exports = exports['default'];