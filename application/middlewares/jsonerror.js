'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = JSONErrorFactory;

function JSONErrorFactory(application) {
	return regeneratorRuntime.mark(function jsonErrorMiddleware(next) {
		return regeneratorRuntime.wrap(function jsonErrorMiddleware$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					context$2$0.prev = 0;
					context$2$0.next = 3;
					return next;

				case 3:
					context$2$0.next = 18;
					break;

				case 5:
					context$2$0.prev = 5;
					context$2$0.t4 = context$2$0['catch'](0);

					context$2$0.t4.expose = true;
					this.response.status = context$2$0.t4.status || 404;

					if (application.log && application.log.error) {
						application.log.error(new Error(context$2$0.t4).stack);
					} else {
						/*eslint-disable no-console */
						console.log.error(new Error(context$2$0.t4).stack);
					}

					context$2$0.t5 = this.accepts('json', 'html', 'text');
					context$2$0.next = context$2$0.t5 === 'json' ? 13 : 16;
					break;

				case 13:
					this.type = 'json';
					this.body = { 'message': context$2$0.t4 ? context$2$0.t4.message : 'page not found', 'err': context$2$0.t4 };
					return context$2$0.abrupt('break', 18);

				case 16:
					this.body = context$2$0.t4 ? context$2$0.t4.message : 'page not found';
					return context$2$0.abrupt('break', 18);

				case 18:
				case 'end':
					return context$2$0.stop();
			}
		}, jsonErrorMiddleware, this, [[0, 5]]);
	});
}

module.exports = exports['default'];