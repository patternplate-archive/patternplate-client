import {normalize} from 'path';
import proxy from 'koa-proxy';

function apiRouteFactory (application) {
	return function * apiRoute (next) {
		let config = application.configuration.client;
		let serverConfig = application.configuration.server;

		let serverHost = `${serverConfig.host}:${serverConfig.port}`;
		let clientHost = `${config.host}:${config.port}`;

		let proxied = clientHost === serverHost;
		let path = proxied ? '/api/pattern/' : '/pattern/';
		let host = `http://${config.host}:${config.port}${path}`;
		this.path = this.path.split('/').slice(2).join('/');

		yield proxy({host}).call(this, next);
	};
}

export default apiRouteFactory;
