import {exec} from 'child_process';

import rimraf from 'rimraf';
import denodeify from 'denodeify';
import {resolve} from 'path';
import {rename} from 'fs';
import chalk from 'chalk';

const rmrf = denodeify(rimraf);
const mv = denodeify(rename);
const execute = denodeify(exec);

async function main(cwd) {
	const pkg = require(resolve(cwd, 'package'));
	const modules = resolve(resolve(cwd, 'node_modules'));
	const tempModules = resolve(resolve(cwd, '_node_modules'));
	const entry = resolve(cwd, pkg.main);

	// Move node modules out of the way and install production dependencies only
	await mv(modules, tempModules);
	await execute('npm install --production');

	// Require the package's entry
	require(entry);

	// Remove production dependencies, move previous node modules in their place
	await rmrf(modules);
	await mv(tempModules, modules);

	return `  ${chalk.green('✔')}   Executed validate-production-dependencies successfully.`;
}

main(process.cwd())
	.then(message => console.log(message))
	.catch(err => {
		console.error(`  ${chalk.red('✖')}   validate-production-dependencies failed.`);
		console.trace(err);
		throw new Error(err);
	});
