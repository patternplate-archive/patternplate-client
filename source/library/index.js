import {resolve} from 'path';

import boilerplateServer from 'boilerplate-server';
import findRoot from 'find-root';

const defaults = {
	name: 'patternplate-client',
	cwd: resolve(findRoot(__dirname), 'distribution', 'library')
};

async function patternplateClient(options) {
	const settings = {...defaults, ...options};
	return boilerplateServer(settings);
}

export default patternplateClient;
