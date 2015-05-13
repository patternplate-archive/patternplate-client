#!/usr/bin/env node --harmony
'use strict';

import 'babel-core/polyfill';
import minimist from 'minimist';

import patternClient from '../';

var args = minimist(process.argv.slice(1));

async function start (options = {}) {
	let application;

	try {
		application = await patternClient(options);
	} catch(err) {
		console.trace(err);
		throw new Error(new Error(err).stack);
	}

	try {
		await application.start();
	} catch(err) {
		application.log.error(new Error(err).stack);
		throw new Error(err);
	}

	async function stop () {
		try {
			await application.stop();
			process.exit( 0 );
		} catch ( err ) {
			application.log.error( err );
			process.exit( 1 );
		}
	}

	process.on( 'SIGINT', () => stop( 'SIGINT' ) );
	process.on( 'SIGHUP', () => stop( 'SIGHUP' ) );
	process.on( 'SIGQUIT', () => stop( 'SIGQUIT' ) );
	process.on( 'SIGABRT', () => stop( 'SIGABRT' ) );
	process.on( 'SIGTERM', () => stop( 'SIGTERM' ) );
}

start(args);
