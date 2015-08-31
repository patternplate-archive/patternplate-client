import {createReadStream} from 'fs';
import {resolve, basename, extname, dirname} from 'path';

import qio from 'q-io/fs';

function scriptRouteFactory (application) {
	return async function scriptRoute () {
		let path = resolve(application.runtime.cwd, 'assets', 'script', this.params.path);

		if (!await qio.exists(path)) {
			return;
		}

		this.type = 'js';
		this.body = createReadStream(path);
	};
}

export default scriptRouteFactory;
