import {normalize} from 'path';
import 'isomorphic-fetch';

function apiRouteFactory (application) {
	return async function apiRoute () {
		const config = application.configuration.client;
		let path = this.params.path;

		let clientPath = config.path[config.path.length - 1] === '/' ? config.path : `${config.path}/`
		let base = `http://${config.host}:${config.port}${clientPath}`;
		let uri = `${base}${path}`;

		let data;

		if (application.cache) {
			data = application.cache.get(uri);
		}

		if (! data) {
			try {
				let response = await fetch(uri, {'headers': {'accept-type':'application/json'}});
				data = await response.json();

				if (application.cache) {
					application.cache.set(uri, data);
				}

				if (response.status >= 400) {
					throw new Error(data.message || `Request to ${base}/${path} failed`, data.error || {});
				}
			} catch (err) {
				this.throw(err, 500);
			}
		}


		this.body = data;
	};
}

export default apiRouteFactory;
