import {resolve} from 'path';

import browserify from 'browserify';
import babelify from 'babelify';
import {exists} from 'q-io/fs';

function bundle(bundler) {
	return new Promise(function(resolve, reject){
		bundler.bundle(function(err, buffer){
			if (err) {
				return reject(err);
			}
			resolve(buffer);
		});
	});
}

function scriptRouteFactory (application) {

	return async function scriptRoute () {
		let path = resolve(application.runtime.cwd, 'assets', 'script', this.params[0].value);

		if (!await exists(path)) {
			return;
		}

		let bundler = browserify();

		bundler.transform(babelify.configure({
			'stage': 0,
			'ignore': /node_modules/,
			'optional': ['runtime']
		}));

		bundler.add(path);

		this.type = 'js';

		try {
			this.body = await bundle(bundler);
		} catch(err) {
			application.log.error(err);
			this.throw(err, 500);
		}
	};
}

export default scriptRouteFactory;
