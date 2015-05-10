import boilerplate from 'boilerplate-server';

async function server (opts) {
	let options = Object.assign({
			'name': 'patternplate-client'
		}, opts);

	return await boilerplate(options);
}

export default server;
