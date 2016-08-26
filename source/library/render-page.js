import url from 'url';
import querystring from 'querystring';

import {merge} from 'lodash';
import {sync as resolveSync} from 'resolve';
import Helmet from 'react-helmet';

import router from '../application/react-routes/server';
import layout from '../application/layouts';
import getIdByPathname from '../application/utils/get-id-by-pathname';
import navigate from '../application/utils/navigate';

const cwd = process.cwd();
const resolve = id => resolveSync(id, {basedir: cwd});

const getSchema = require(resolve('patternplate-server/library/get-schema'));
const getNavigation = require(resolve('patternplate-server/library/get-navigation'));
const getPatternMetaData = require(resolve('patternplate-server/library/get-pattern-meta-data'));

const defaultData = {
	schema: {},
	navigation: {},
	patterns: null,
	messages: []
};

export default async function renderPage(application, pageUrl) {
	const app = application.parent;
	const client = application;
	const server = app.server;

	const parsed = url.parse(pageUrl);
	const depth = parsed.pathname.split('/').filter(Boolean).length;
	const query = querystring.parse(parsed.query);
	const base = depth > 0 ? Array(depth).fill('..').join('/') : '.';

	const id = getIdByPathname(parsed.pathname);

	const schema = app ? await getSchema(app, client, server) : {};
	const navigation = app ? await getNavigation(app, client, server) : {};
	const pattern = navigate(id, navigation);

	if (pattern && pattern.type === 'pattern') {
		const patternData = await getPatternMetaData(server, id);
		merge(pattern, patternData);
	}

	const config = application.configuration.ui;
	const options = {
		url: pageUrl,
		title: application.configuration.ui.title || schema.name,
		theme: query.theme || application.configuration.ui.theme,
		config
	};

	const serverData = {schema, navigation, pattern};
	const data = merge(defaultData, options.data, serverData, {config});
	const content = await router(options.url, data);
	const head = Helmet.rewind();

	return layout({
		attributes: head.htmlAttributes,
		base,
		content,
		data: JSON.stringify(data),
		link: head.link,
		meta: head.meta,
		style: head.style,
		title: head.title,
		scripts: [
			`${base}/script/vendors.bundle.js`,
			`${base}/script/index.bundle.js`
		]
	});
}
