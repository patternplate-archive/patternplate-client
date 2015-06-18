import {normalize} from 'path';
import proxy from 'koa-proxy';

function apiRouteFactory (application) {
	return function * apiRoute (next) {
		let config = application.configuration.client;
		let host = `http://${config.host}:${config.port}`;

		this.path = '/' + this.path.split('/').slice(2).join('/');
		yield proxy({host}).call(this, next);
	};
}

export default apiRouteFactory;
