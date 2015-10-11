import boilerplateServer from 'boilerplate-server';

const defaults = {
	name: 'patternplate-client',
	cwd: __dirname
};

async function patternplateClient(options) {
	const settings = {...defaults, ...options};
	return boilerplateServer(settings);
}

export default patternplateClient;
