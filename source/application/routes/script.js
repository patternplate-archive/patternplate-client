import {resolve} from 'path';

import browserify from 'browserify';
import babelify from 'babelify';
import uglifyify from 'uglifyify';
import {exists, list} from 'q-io/fs';

const memo = {};

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

async function preBundle (application) {
	if (application.configuration.environment === 'production') {
		let scripts = resolve(application.runtime.cwd, 'assets', 'script');
		let files = await list(scripts);

		for (let file of files) {
			let bundler = browserify();

			bundler.transform(babelify.configure({
				'stage': 0,
				'ignore': /node_modules/,
				'optional': ['runtime']
			}));

			bundler.transform(uglifyify.configure({
				'global': true
			}));

			bundler.add(resolve(scripts, file));

			try {
				memo[resolve(scripts, file)] = await bundle(bundler);
			} catch(err) {
				application.log.error(err);
			}
		}
	}
}

function scriptRouteFactory (application) {
	preBundle(application);

	return async function scriptRoute () {
		let path = resolve(application.runtime.cwd, 'assets', 'script', this.params.path || '');

		if (!await exists(path)) {
			return;
		}

		this.type = 'js';

		if (application.configuration.environment === 'production' && memo[path]) {
			this.body = memo[path];
			return;
		}

		let bundler = browserify();

		bundler.transform(babelify.configure({
			'stage': 0,
			'ignore': /node_modules/,
			'optional': ['runtime']
		}));

		bundler.add(path);

		try {
			memo[path] = await bundle(bundler);
			this.body = memo[path];
		} catch(err) {
			application.log.error(err);
			this.throw(err, 500);
		}
	};
}

export default scriptRouteFactory;
