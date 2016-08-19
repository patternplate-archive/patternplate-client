import path from 'path';
import {sync as resolveSync} from 'resolve';
const resolve = id => resolveSync(id, {basedir: process.cwd()});

import urlQuery from '../utils/url-query';

function requireServer(id) {
	return require(resolve(`patternplate-server/library/${id}`));
}

function getPatternId(raw) {
	const parsed = path.parse(raw);
	const base = path.basename(raw, path.extname(raw));

	if (base === 'index' && path.extname(raw) !== '.json') {
		return path.dirname(raw);
	}

	return `${path.dirname(raw)}/${path.basename(parsed.base, path.extname(parsed.base))}`;
}

const getPatternDemo = requireServer('get-pattern-demo');

function demoRouteFactory(application) {
	return async function demoRoute() {
		this.type = 'html';

		const server = (application.parent && application.parent.server) ||
			application.server;

		if (!server) {
			this.throw(500, new Error('patternplate-server is unavailable, are you running patternplate?'));
			return;
		}

		const parsed = urlQuery.parse(this.params.id);
		const id = getPatternId(parsed.pathname);
		const {environment = 'index'} = parsed.query;

		const filters = {
			outFormats: ['html'],
			environments: [environment].filter(Boolean)
		};

		this.body = await getPatternDemo(server, id, filters, environment);
	};
}

export default demoRouteFactory;
