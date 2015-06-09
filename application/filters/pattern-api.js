'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
function patternApiFilterFactory() {
	function patternApiFilter(data, path) {
		var copy;
		return regeneratorRuntime.async(function patternApiFilter$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					if (path.match(/^pattern\/(.*)/)) {
						context$2$0.next = 2;
						break;
					}

					return context$2$0.abrupt('return', data);

				case 2:
					if (!(typeof data === 'undefined')) {
						context$2$0.next = 4;
						break;
					}

					return context$2$0.abrupt('return', data);

				case 4:
					copy = data;

					if (Array.isArray(copy)) {
						copy.forEach(function applyTransformToArrayItem(item, index) {
							return regeneratorRuntime.async(function applyTransformToArrayItem$(context$3$0) {
								while (1) switch (context$3$0.prev = context$3$0.next) {
									case 0:
										context$3$0.next = 2;
										return regeneratorRuntime.awrap(patternApiFilter(item, path));

									case 2:
										copy[index] = context$3$0.sent;

									case 3:
									case 'end':
										return context$3$0.stop();
								}
							}, null, this);
						});
					}

					return context$2$0.abrupt('return', copy);

				case 7:
				case 'end':
					return context$2$0.stop();
			}
		}, null, this);
	}

	return patternApiFilter;
}

exports['default'] = patternApiFilterFactory;
module.exports = exports['default'];