import {resolve} from 'path';

import less from 'less';
import {exists, read, directory} from 'q-io/fs';

function styleRouteFactory (application) {

	return async function scriptRoute () {
		let name = this.params[0].value.replace('.css', '.less');
		let path = resolve(application.runtime.cwd, 'assets', 'style', name);

		if (!await exists(path)) {
			return;
		}

		try {
			let source = await read(path);
			let results = await less.render(source, {
				'paths': [directory(path), resolve(application.runtime.cwd, 'node_modules')]
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
