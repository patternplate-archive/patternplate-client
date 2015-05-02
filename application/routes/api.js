import 'isomorphic-fetch';
import patternApiFilterFactory from '../filters/pattern-api';

function apiRouteFactory (application) {
	const config = application.configuration.client;
	let base = `http://${config.server}:${config.port}`;
	const filter = patternApiFilterFactory(application);

	return async function apiRoute () {
		let data = {};
		let path = this.params[0].value;

		try {
			let response = await fetch(`${base}/${path}`);
			data = await response.json();
			data = await filter(data, path);
		} catch (err) {
			application.log.error(err);
			this.throw(err, 500);
		} finally {
			this.type = 'json';
			this.body = data;
		}
	};
}

export default apiRouteFactory;
