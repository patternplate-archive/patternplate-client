import {resolve} from 'path';

import browserify from 'browserify';
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

function applyTransforms (bundler, transformNames, transformConfigs, transformDictionary) {
	for (let transformName of transformNames) {
		/*eslint-disable no-continue*/
		let transformFn = transformDictionary[transformName];
		let args;

		if (!transformFn) {
			continue;
		}

		if (typeof transformFn.configure === 'function') {
			args = [transformFn.configure(transformConfigs[transformName])];
		} else {
			args = [transformFn, transformConfigs[transformName]];
		}

		bundler.transform(...args);
	}

	return bundler;
}


function scriptRouteFactory (application) {
	const browserifyConfig = application.configuration.assets.browserify || {};

	const transformNames = Object.keys(browserifyConfig.transforms).filter((transformName) => {
		return browserifyConfig.transforms[transformName].enabled;
	});

	const transformConfigs = transformNames.reduce(function getTransformConfig (results, transformName) {
		results[transformName] = browserifyConfig.transforms[transformName].opts || {};
		return results;
	}, {});

	const transformFns = transformNames.reduce(function getTransformFns (results, transformName) {
		results[transformName] = require(require.resolve(transformName));
		return results;
	}, {});

	const useTransforms = (bundler) => applyTransforms(bundler, transformNames, transformConfigs, transformFns);

	try {
		preBundle(application);
	} catch (err) {
		application.log.warn(`Prebundling of scripts failed`);
		application.log.trace(err);
	}

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
		useTransforms(bundler);
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
