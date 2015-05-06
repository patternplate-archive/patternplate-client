'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _stringHumanize = require('string-humanize');

var _stringHumanize2 = _interopRequireDefault(_stringHumanize);

function humanizeTree(tree) {
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = Object.keys(tree)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var leafName = _step.value;

			var sub = tree[leafName];

			if (typeof sub === 'object') {
				sub = humanizeTree(sub);
				tree[_stringHumanize2['default'](leafName)] = sub;
				delete tree[leafName];
			} else {
				tree[leafName] = _stringHumanize2['default'](leafName);
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

	return tree;
}

exports['default'] = humanizeTree;
module.exports = exports['default'];