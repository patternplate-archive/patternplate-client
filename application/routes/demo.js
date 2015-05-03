import 'isomorphic-fetch';
import layout from '../layouts/demo';

function demoRouteFactory (application) {
	const config = application.configuration.client;
	let base = `http://${config.server}:${config.port}`;

	return async function demoRoute () {
		let path = this.params[0].value;

		let templateData = {
			'style': {
				'index': '',
				'demo': ''
			},
			'script': {
				'index': '',
				'demo': ''
			},
			'content': '',
			'raw': null,
			'title': path
		};

		try {
			let response = await fetch(`${base}/pattern/${path}`);
			let data = await response.json();

			if (data.results.Style) {
				templateData.style.index = data.results.Style.buffer || '';
				templateData.style.demo = data.results.Style.demoBuffer || '';
			}

			if (data.results.Markup) {
				templateData.content = data.results.Markup.buffer || data.results.Markup.demoBuffer;
			}

			if (data.results.Script) {
				templateData.script.index = data.results.Script.buffer || '';
				templateData.script.demo = data.results.Script.demoBuffer || '';
			}

		} catch (err) {
			application.log.error(err);
			this.throw(err, 500);
		} finally {
			this.body = layout(templateData);
		}
	};
}

export default demoRouteFactory;
