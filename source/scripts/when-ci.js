import chalk from 'chalk';
import {spawn} from 'child_process';

const execute = async (command, flags) => {
	return new Promise((resolve, reject) => {
		const instance = spawn(command, flags, {stdio: 'inherit'});
		instance.on('error', reject);
		instance.on('exit', code => {
			if (code !== 0) {
				reject(`Process exited with code ${code}`);
			}
			resolve();
		});
	});
};

async function main(command, flags) {
	if (process.env.CI !== 'true') {
		const cmd = [...arguments].join(' ');
		return `  ${chalk.green('✔')}   Not in CI environment, skipping "${cmd}"\n`;
	}

	return await execute(command, flags);
}

const args = process.argv.slice(2);
const [command, ...flags] = args;

main(command, flags)
	.then(message => message && console.log(message))
	.catch(err => {
		// So who thought Promise.catch would gobble up errors?
		setTimeout(() => {
			throw new Error(err);
		}, 0);
	});
