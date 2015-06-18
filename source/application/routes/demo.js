import 'isomorphic-fetch';
import layout from '../layouts/demo';

function getWrapper (expression) {
	if (!expression) {
		return function faithfulWrapper (input) {
			return input;
		};
	}

	if (expression === '!IE') {
		return function noIEWrapper (input) {
			return `<!--[if !IE]> -->\n${input}\n<!-- <![endif]-->`;
		};
	}

	return function IEWrapper (input) {
		return `<!--[if ${expression}]>\n${input}\n<![endif]-->`;
	};
}

function demoRouteFactory (application) {
	return async function demoRoute () {
		const config = application.configuration.client;
		let clientPath = config.path[config.path.length - 1] === '/' ? config.path : `${config.path}/`
		let base = `http://${config.host}:${config.port}${clientPath}`;

		let headers = {
			'accept-type': 'application/json',
			'authorization': this.request.header.authorization
		};

		let path = this.params.path;
		let uri = `${base}pattern/${path}`;

		let data;

		if (application.cache) {
			data = application.cache.get(uri);
		}

		if (!data) {
			let response = await fetch(uri, {headers});

			try {
				response = await response;
			} catch (err) {
				application.log.error(err);
				this.throw(err, 500);
			}

			data = response.json();

			if (application.cache) {
				application.cache.set(uri, data);
			}
		}

		try {
			data = await data;

			let templateData = {
				'title': path,
				'style': [],
				'script': [],
				'markup': []
			};

			for (let environmentName of Object.keys(data.results)) {
				let environment = data.results[environmentName];
				let envConfig = data.environments[environmentName].manifest;
				let wrapper = getWrapper(envConfig['conditional-comment']);
				let blueprint = {'environment': environmentName, 'content': '', wrapper};

				for (let resultType of Object.keys(environment)) {
					let result = environment[resultType];
					let templateKey = resultType.toLowerCase();

					let content = result.demoBuffer || result.buffer;
					let templateSectionData = Object.assign({}, blueprint, {content});

					templateData[templateKey] = Array.isArray(templateData[templateKey]) ?
						templateData[templateKey].concat([templateSectionData]) :
						[templateSectionData];
				}
			}
			this.body = layout(templateData);
		} catch (err) {
			application.log.error(err);
			this.throw(err, 500);
		}
	};
}

export default demoRouteFactory;
