import chalk from 'chalk';
import denodeify from 'denodeify';
import {exec} from 'child_process';

const execute = denodeify(exec);

function validate(message) {
	const length = 100;
	const pattern = /^((?:fixup!\s*)?(\w*)(\(([\w\$\.\*/-]*)\))?\: (.*))(\n|$)/;
	const release = /^\d.\d.\d$/;
	const pullRequest = /^(Merge pull request)|(Merge (.*?) into (.*?)$)/i;

	const types = [
		'feat',
		'fix',
		'docs',
		'style',
		'refactor',
		'perf',
		'test',
		'chore',
		'revert'
	];

	if (message.match(pullRequest)) {
		return true;
	}

	if (message.match(release)) {
		return true;
	}

	const match = message.match(pattern);

	if (!match) {
		throw new Error(`does not match "<type>(<scope>): <subject>", was: "${message}"`);
	}

	const [, line, type, scope, scopeName, subject] = [...match];

	if (line.length > length) {
		throw new Error(`is too long: ${line.length} characters, ${length} allowed`);
	}

	if (types.indexOf(type) === -1) {
		throw new Error(`unknown type: "${type}", allowed: ${types.join(', ')}`);
	}

	if (!scopeName && !scope) {
		console.warn('Specifying a scope is recommended');
	}

	if (scope && !scopeName) {
		throw new Error(`empty scope: specifying empty scope parenthesis is not allowed`);
	}

	if (!subject) {
		throw new Error(`empty subject: a subject is required`);
	}

	return true;
}

async function getHashes() {
	/* const range = process.env.TRAVIS_COMMIT_RANGE;
	let result;

	if (range) {
		const list = await execute(`git rev-list ${range}`);
		result = list.split('\n');
	} else {
		result = ;
	} */

	// return result;
	return [process.env.TRAVIS_COMMIT];
}

async function getMessage(hash) {
	if (!hash) {
		return '';
	}

	const raw = await execute(`git log -1 --format=oneline ${hash}`);
	return raw.split('\n')[0].replace(`${hash} `, '');
}

async function getMessages(hashes) {
	return Promise.all(hashes
		.filter(hash => hash)
		.map(async function(hash) {
			return getMessage(hash);
		}));
}

async function main() {
	const hashes = await getHashes();
	const messages = await getMessages(hashes);
	const checked = messages.filter(message => message).map(validate);

	return `  ${chalk.green('✔')}   Executed validate-commit-msg on ${checked.length} messages successfully.\n`;
}

main()
	.then(message => console.log(message))
	.catch(err => {
		console.error(`  ✖   validate-commit-msg failed.\n`);
		console.trace(err);
		// So who thought Promise.catch would gobble up errors?
		setTimeout(() => {
			throw new Error(err);
		}, 0);
	});
