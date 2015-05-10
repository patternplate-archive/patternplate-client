import {normalize} from 'path';
import 'isomorphic-fetch';

function apiRouteFactory (application) {
	return async function apiRoute () {
		const config = application.configuration.client;
		let path = this.params.path;

		let clientPath = config.path[config.path.length - 1] === '/' ? config.path : `${config.path}/`
		let base = `http://${config.host}:${config.port}${clientPath}`;

		try {
			let response = await fetch(`${base}${path}`, {'headers': {'accept-type':'application/json'}});
			let data = await response.json();

			if (response.status < 400) {
				this.body = data;
			} else {
				throw new Error(data.message || `Request to ${base}/${path} failed`, data.error || {});
			}
		} catch (err) {
			this.throw(err, 500);
		}
	};
}

export default apiRouteFactory;
