import url from 'url';
import os from 'os';

import {merge} from 'lodash';
import Helmet from 'react-helmet';
import {sync as resolveSync} from 'resolve';
import queryString from 'query-string';
import platform from 'platform';

import router from '../application/react-routes/server';
import layout from '../application/layouts';
import getIdByPathname from '../application/utils/get-id-by-pathname';
import navigate from '../application/utils/navigate';
import Icon from '../application/components/common/icon';

const cwd = process.cwd();
const resolve = id => resolveSync(id, {basedir: cwd});

const getSchema = require(resolve('patternplate-server/library/get-schema'));
const getNavigation = require(resolve('patternplate-server/library/get-navigation'));
const getPatternMetaData = require(resolve('patternplate-server/library/get-pattern-meta-data'));
// const getPatternSource = require(resolve('patternplate-server/library/get-pattern-source'));

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
	const query = queryString.parse(parsed.query);
	const base = depth > 0 ? Array(depth).fill('..').join('/') : '.';

	const id = getIdByPathname(parsed.pathname);

	const schema = app ? await getSchema(app, client, server) : {};
	const navigation = app ? await getNavigation(app, client, server) : {};
	const pattern = merge({}, navigate(id, navigation));
	const isPattern = pattern && pattern.type === 'pattern';
	// const sourceId = query.source;

	if (isPattern) {
		try {
			const patternData = await getPatternMetaData(server, id);
			merge(pattern, patternData);
		} catch (error) {
			application.log.error(error);
		}
	}

	/* if (isPattern && sourceId) {
		try {
			const parsed = urlQuery.parse(sourceId);
			const fileType = parsed.query.type || 'source';
			const env = query.environment || 'index';
			const patternFile = await getPatternSource(server)(parsed.pathname, fileType, env);
			// merge(pattern, {sources: {[sourceId]: await consumeFile(patternFile.body)}});
		} catch (error) {
			application.log.error(error);
		}
	} */

	const config = application.configuration.ui;
	const options = {
		url: pageUrl,
		title: application.configuration.ui.title || schema.name,
		theme: query.theme || application.configuration.ui.theme,
		config
	};

	const serverData = {schema, navigation, pattern};
	const data = merge({}, defaultData, options.data, serverData, {config}, {
		schema: {
			serverOsName: os.type(),
			serverOsVersion: os.release(),
			serverRuntimeName: platform.name,
			serverRuntimeVersion: platform.version
		},
		startPathname: pageUrl,
		startBase: base
	});

	const content = await router(options.url, data);
	const head = Helmet.rewind();
	const icons = Icon.rewind();

	return layout({
		attributes: head.htmlAttributes,
		base,
		content,
		icons,
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

/* async function consumeFile(input) {
	if (isStream(input)) {
		return await streamToString(input);
	}

	return input;
}

function streamToString(input) {
	return new Promise((resolve, reject) => {
		const buffers = [];
		input.on('data', chunk => buffers.push(chunk));
		input.on('end', () => resolve(Buffer.concat(buffers).toString()));
		input.on('error', reject);
	});
} */
