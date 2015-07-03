import boilerplate from 'boilerplate-server';
import appRootPath from 'app-root-path';

async function server (opts) {
	let options = Object.assign({
			'name': 'patternplate-client',
			'cwd': appRootPath.path
		}, opts);

	return await boilerplate(options);
}

export default server;
