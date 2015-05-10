import {resolve} from 'path';

import less from 'less';
import Autoprefix from 'less-plugin-autoprefix';
import Cleancss from 'less-plugin-clean-css';

import {exists, read, directory} from 'q-io/fs';

function styleRouteFactory (application) {

	return async function scriptRoute () {
		let name = (this.params.path || '').replace('.css', '.less');
		let path = resolve(application.runtime.cwd, 'assets', 'style', name);

		if (!await exists(path)) {
			return;
		}

		let autoprefix = new Autoprefix({'browser': ['IE 8', 'last 2 versions']});
		let cleancss = new Cleancss({'advanced': true});

		try {
			let source = await read(path);
			let results = await less.render(source, {
				'paths': [directory(path), resolve(application.runtime.cwd, 'node_modules')],
				'plugins': [autoprefix, cleancss]
			});

			this.type = 'css';
			this.body = results.css;
		} catch(err) {
			application.log.error(err);
			this.throw(err, 500);
		}
	};
}

export default styleRouteFactory;
