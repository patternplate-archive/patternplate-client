import url from 'url';
import os from 'os';

import {fill, merge, entries} from 'lodash';
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

const defaultData = {
	schema: {},
	navigation: {},
	patterns: null,
	messages: []
};

export default async function renderPage(application, pageUrl, filters = {}) {
	const app = application.parent;
	const client = application;
	const server = app.server;
	const filter = getFilter(filters);

	const parsed = url.parse(pageUrl);
	const depth = parsed.pathname.split('/').filter(Boolean).length;
	const query = queryString.parse(parsed.query);
	const base = depth > 0 ? fill(Array(depth), '..').join('/') : '.';

	const id = getIdByPathname(parsed.pathname);

	const schema = app ? await getSchema(app, client, server) : {};
	const navigation = app ? await getNavigation(app, client, server) : {};
	const filteredNavigation = applyFilters(navigation, filter);

	const pattern = merge({}, navigate(id, filteredNavigation));
	const isPattern = pattern && pattern.type === 'pattern';

	if (isPattern) {
		try {
			const patternData = await getPatternMetaData(server, id);
			merge(pattern, patternData);
		} catch (error) {
			application.log.error(error);
		}
	}

	const config = application.configuration.ui;
	const options = {
		url: pageUrl,
		title: application.configuration.ui.title || schema.name,
		theme: query.theme || application.configuration.ui.theme,
		config
	};

	const serverData = {schema, navigation: filteredNavigation, pattern};
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

const pass = () => true;

function applyFilters(raw, filter) {
	return entries(raw).reduce((results, entry) => {
		const [key, item] = entry;
		if (item.type !== 'pattern') {
			results[key] = item;
			item.children = applyFilters(item.children, filter);
			return results;
		}
		if (filter(item.manifest)) {
			results[key] = item;
		}
		return results;
	}, {});
}

function getFilter(filters) {
	const flags = filters.flags || [];

	if (flags.length === 0) {
		return pass;
	}

	return item => {
		return flags.includes(item.flag);
	};
}
