#!/usr/bin/env node
import 'babel-core/polyfill';
import minimist from 'minimist';

import patternPlateClient from '../library';

async function start(options = {}) {
	const application = await patternPlateClient(options);
	await application.start();
}

const args = minimist(process.argv.slice(1));

start(args)
	.catch(err => {
		console.error(err);
		console.trace(err);
		throw err;
	});
