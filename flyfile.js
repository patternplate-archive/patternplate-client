import {spawn} from 'child_process';
import jsdoc from 'jsdoc-to-markdown';
import pkg from './package.json';
import {btoa} from 'abab';
import md5 from 'md5';

const paths = {
	root: '.',
	source: ['source/!(static)/**/*.@(js|jsx)'],
	documentation: 'source/**/*.mjs',
	json: 'source/**/*.json',
	distribution: 'distribution',
	docs: ['./*.md', 'documentation/**/*.md']
};

const docTemplate = `
{{#module name="patternplate-core"}}
{{>member-index~}}
{{>body~}}
{{>members~}}
{{/module}}
`;

const shortDocTemplate = `
{{#module name="patternplate-core"}}
{{>member-index~}}
{{>body~}}
{{/module}}
`;

function jsdoc2md(template = docTemplate) {
	return new Promise((resolve, reject) => {
		jsdoc({
			src: [
				`${paths.distribution}/library/**/*.js`,
				`${paths.distribution}/binary/**/*.js`
			],
			template
		})
		.on('error', err => reject(err))
		.on('data', buffer => resolve(buffer.toString('utf-8')));
	});
}

export async function test() {
	/** @desc Executes npm test */
	return new Promise((resolve, reject) => {
		const test = spawn('npm', ['test'], {stdio: 'inherit'});
		test.on('error', reject);
		test.on('exit', code => {
			if (code !== 0) {
				reject(`Process exited with code ${code}`);
			}
			resolve();
		});
	});
}

export async function documentation() {
	/** @desc Builds documentation from 'source/*.mjs' to './*.md' */
	const source = await this.source(paths.documentation);

	if (!source.documentation) {
		source.filter('documentation', async function(buffer, options) {
			const code = buffer.toString('utf-8').replace(/`/g, '\\`');
			const body = ['return `', code, '`\n'].join('');

			try {
				const data = new Function('props', body)(options);
				return {data, ext: '.md'};
			} catch (err) {
				err.message = `Error while executing documentation inline js: ${err.message}`;
				throw err;
			}
		});
	}

	const apiDocs = await jsdoc2md();
	const shortDocs = await jsdoc2md(shortDocTemplate);
	const helpers = {btoa, md5};

	return await source
		.documentation({pkg, apiDocs, shortDocs, helpers})
		.target(paths.root);
}

export async function build() {
	/** @desc Transpiles sources and lints them. Executes the tasks clear, copy and test */
	const source = await this.source(paths.source);

	//await source.eslint();
	const results = await source.babel();

	await this.start('clear');
	await results.target(paths.distribution);
	await this.start('copy');
}

export async function copy() {
	/** @desc Copies all json files from source to distribution */
	return await this.source(paths.json).target(paths.distribution);
}

export async function clear() {
	/** @desc Removes all build output from the project */
	return await this.clear(paths.distribution);
}

export async function watch() {
	/** @desc Watches files found in ./source and starts build and/or documentation tasks on file changes */
	await this.watch(paths.source, ['build', 'documentation', 'test']);
	await this.watch(paths.documentation, ['documentation']);
}

export default async function () {
	/** @desc Starts the watch task */
	return await this.start('watch');
}
