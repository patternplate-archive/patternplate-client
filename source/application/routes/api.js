import 'isomorphic-fetch';
import patternApiFilterFactory from '../filters/pattern-api';

function apiRouteFactory (application) {
	const config = application.configuration.client;
	let base = `http://${config.server}:${config.port}`;
	const filter = patternApiFilterFactory(application);

	return async function apiRoute () {
		let path = this.params[0].value;

		try {
			let response = await fetch(`${base}/${path}`, {'headers': {'accept-type':'application/json'}});
			let data = await response.json();

			if (response.status < 400) {
				data = await filter(data, path);
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
