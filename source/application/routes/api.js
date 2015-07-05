import {normalize} from 'path';
import proxy from 'koa-proxy';
import btoa from 'btoa';

function apiRouteFactory (application) {
	return function * apiRoute (next) {
		let config = application.configuration.client;
		let host = `http://${config.host}:${config.port}`;
		this.path = '/' + this.path.split('/').slice(2).join('/');

		Object.assign(this.headers, config.headers || {});

		if (config.credentials) {
			this.headers.authorization = 'Basic ' + btoa(`${config.credentials.name}:${config.credentials.pass}`);
		}

		yield proxy({host}).call(this, next);
	};
}

export default apiRouteFactory;
