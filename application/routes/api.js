import request from 'request-promise';

function apiRouteFactory (application, configuration) {
	const config = application.configuration.client;
	let base = `http://${config.server}:${config.port}`;

	return async function apiRoute () {
		let path = this.params[0].value;
		let data = {};

		try {
			data = JSON.parse(await request(`${base}/${path}`));
		} catch (err) {
			application.log.error(err);
			return;
		}

		this.type = 'json';
		this.body = data;
	};
}

export default apiRouteFactory;
