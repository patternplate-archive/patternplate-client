import fs from 'fs';
import path from 'path';
import {merge} from 'lodash';
import {sync as resolveSync} from 'resolve';

import router from '../application/react-routes';
import layout from '../application/layouts';

const cwd = process.cwd();
const resolve = id => resolveSync(id, {basedir: cwd});

const getSchema = require(resolve('patternplate-server/library/get-schema'));
const getNavigation = require(resolve('patternplate-server/library/get-navigation'));

const iconsPath = path.resolve(__dirname, '../static/images/patternplate-inline-icons.svg');
const icons = fs.readFileSync(iconsPath);

const defaultData = {
	schema: {},
	navigation: {},
	patterns: null,
	messages: []
};

export default async function renderPage(application, url) {
	const schema = await getSchema(application.parent.server);
	const navigation = await getNavigation(application.parent.server);

	const options = {
		url,
		title: application.configuration.ui.title || 'patternplate-client',
		theme: application.configuration.ui.theme,
		config: application.configuration.ui
	};

	const serverData = {schema, navigation};
	const data = merge(defaultData, options.data, serverData, {config: options.config});
	const content = await router(options.url, data);

	return layout({
		title: options.title,
		data: JSON.stringify(data),
		content,
		script: '/script/index.bundle.js',
		stylesheet: `/style/${options.theme}.css`,
		icons
	});
}
