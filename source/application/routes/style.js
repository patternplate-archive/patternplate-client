import {dirname, resolve} from 'path';
import {readFile as fsReadFile, createReadStream} from 'fs';

import denodeify from 'denodeify';
import exists from 'path-exists';
import less from 'less';
import Autoprefix from 'less-plugin-autoprefix';
import Cleancss from 'less-plugin-clean-css';
import NpmImport from 'less-plugin-npm-import';

const autoprefix = new Autoprefix({browser: ['IE 8', 'last 2 versions']});
const cleancss = new Cleancss({advanced: true});
const npmimport = new NpmImport();

const readFile = denodeify(fsReadFile);

function styleRouteFactory(application) {
	return async function scriptRoute() {
		const staticPath = resolve(application.runtime.cwd, 'assets', 'style', this.params.path);

		if (await exists(staticPath)) {
			this.type = 'css';
			this.body = createReadStream(staticPath);
			return;
		}

		const name = (this.params.path || '').replace('.css', '.less');
		const path = resolve(application.runtime.cwd, 'assets', 'style', name);

		if (!await exists(path)) {
			return;
		}

		try {
			const buffer = await readFile(path);
			const results = await less.render(buffer.toString(), {
				paths: [dirname(path)],
				plugins: [npmimport, autoprefix, cleancss]
			});

			this.type = 'css';
			this.body = results.css;
		} catch (err) {
			application.log.error(err);
			this.throw(err, 500);
		}
	};
}

export default styleRouteFactory;
