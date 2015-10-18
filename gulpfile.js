/* eslint-disable */
const read = require('fs').readFileSync;
const resolve = require('path').resolve;
const basename = require('path').basename;
const dirname = require('path').dirname;

const gulp = require('gulp');
const sequence = require('gulp-sequence');
const util = require('gulp-util');
const cached = require('gulp-cached');
const remember = require('gulp-remember');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const template = require('gulp-template');
const data = require('gulp-data');
const extension = require('gulp-ext-replace');
const jsdoc = require('gulp-jsdoc-to-markdown');
const tape = require('gulp-tape');

const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const envify = require('envify');
const cssmodulesify = require('css-modulesify');
const autoprefixer = require('autoprefixer');
const livereactload = require('livereactload');

const del = require('del');
const mkdirp = require('mkdirp');
const md5 = require('md5');
const spec = require('tap-spec');
const yaml = require('yamljs');
const rc = require('rc');
const functionName = require('fn-name');
const source = require('vinyl-source-stream');
const omit = require('lodash').omit;

const pkg = require('./package');
const travis = yaml.load(resolve('./.travis.yml'));
const appveyor = yaml.load(resolve('./appveyor.yml'));

const paths = {
	root: '.',
	// source globs
	source: [
		'source/**/*.{js,jsx}',
		'!source/library/universal/**/*',
		'!source/library/static/**/*'
	],
	api: 'distribution/library/**/*.js',
	universal: {
		in: './source/library/universal/server.js',
		out: './distribution/library/universal'
	},
	assets: [
		'source/library/static/**/*',
		'!source/library/static/script/**/*'
	],
	script: {
		in: 'source/library/static/script/index.js',
		out: 'distribution/library/static/script'
	},
	templates: ['source/**/*.tpl'],
	test: ['distribution/test/index.js'],
	// target globs
	public: 'distribution/library/static',
	css: './distribution/library/static/style/light.css',
	documentation: ['./*.md', 'documentation/**/*.md'],
	distribution: 'distribution'
};

const templates = {
	'long': read('source/templates/long.hbs', 'utf-8'),
	'short': read('source/templates/short.hbs', 'utf-8')
};

/**
 * Helper to create gulp tasks from named functions on the fly
 * Allows for keeping tasks around as functions and keeping them private
 * @param  {Function} fn named function that should be used as gulp task
 * @param  {string}   forced optional forced name for the task to create
 * @return {string}   name of the created task
 */
function task(fn, forced) {
	const name = forced || functionName(fn);
	const tasks = Object.keys(gulp.tasks);

	if (tasks.indexOf(name) === -1) {
		gulp.task(name, fn);
	}

	return name;
}

/**
 * Helper to fetch babel configuration rc files with custom names
 * Allows for keeping tasks around as functions and keeping them private
 * @param  {string} [name='babel'] name of the rc file to search for
 * @return {object} fetched babel configuration
 */
function getBabelConfig(forced) {
	const name = forced || 'babel';
	return omit(rc(name), ['_', 'config', 'configs']);
}

/**
 * Helper to create a templated markdown string from js sources
 * @param  {string}   template string to use
 * @param  {Function} callback bback-style callback
 */
function apiDoc(template, callback) {
	gulp.src(resolve(paths.api), {read: false})
		.pipe(remember('transpile'))
		.pipe(concat('api'))
		.pipe(jsdoc({template: template}))
		.on('data', function(data) {
			callback(null, data.contents.toString());
		});
}

function documentation(callback) {
	/* @desc build markdown from sources */
	apiDoc(templates.long, function(err, long) {
		if (err) {
			return callback(err);
		}

		const props = {
			pkg: pkg,
			appveyor: appveyor,
			travis: travis,
			branch: 'next',
			api:
			{
				long: long
			}
		};

		return gulp.src(paths.templates)
			.pipe(cached('markdown'))
				.pipe(data({
					props: props,
					helpers: {
						md5: md5
					}
				}))
				.pipe(template())
			.pipe(remember('markdown'))
			.pipe(extension('.md'))
			.pipe(gulp.dest(paths.root))
			.on('end', function() {
				callback(null);
			});
	});
}

function copy() {
	/* @desc copy json form source to distribution */
	return gulp.src(paths.assets)
		.pipe(gulp.dest(paths.public));
}

function transpile() {
	/* @desc lint and babel main sources */
	return gulp.src(paths.source)
		.pipe(cached('transpile'))
			.pipe(eslint())
			.pipe(eslint.failOnError())
			.pipe(babel())
			.pipe(remember('transpile'))
		.pipe(gulp.dest(paths.distribution));
}

const universalBundler = browserify({
	entries: paths.universal.in,
	extensions: ['.js', '.jsx'],
	transform: [babelify.configure()],
	cache: {},
	packageCache: {},
	standalone: 'standalone'
});

universalBundler.plugin(cssmodulesify, {
	rootDir: __dirname,
	output: paths.css,
	generateScopedName: cssmodulesify.generateShortName,
	postcssAfter: [autoprefixer()]
});

universalBundler.on('log', util.log);

function universal(cb) {
	mkdirp(dirname(paths.css), function(err){
		if (err) {
			return cb(err);
		}

		universalBundler.bundle()
			.on('error', util.log)
			.on('end', function(){
				typeof cb === 'function' && cb();
			})
			.pipe(source(basename(paths.universal.in)))
			.pipe(gulp.dest(paths.universal.out));
	});
}

const clientBundler = browserify({
	entries: paths.script.in,
	extensions: ['.js', '.jsx'],
	transform: [babelify.configure(getBabelConfig('babel-client'))],
	// plugin: [livereactload], // something still fishy with this, try again later
	cache: {},
	packageCache: {},
	debug: true,
	fullPaths: true
});

clientBundler.plugin(cssmodulesify, {
	rootDir: __dirname,
	generateScopedName: cssmodulesify.generateShortName
});

universalBundler.on('log', util.log);

function client() {
	return clientBundler.bundle()
		.on('error', util.log)
		.pipe(source(basename(paths.script.in)))
		.pipe(gulp.dest(paths.script.out))
}

function incremental(done) {
	/* @desc small build run without prior cleaning */
	return sequence(
		[
			task(transpile),
			task(universal),
			task(client),
			task(copy)
		],
		task(test),
		task(documentation)
	)(done);
}

/**
 * public tasks definitions
 */
function build(done) {
	/* @desc execute full source build */
	return sequence(
		task(clean),
		[
			task(transpile),
			task(universal),
			task(client),
			task(copy)
		],
		task(test),
		task(documentation)
	)(done);
}

function clean() {
	/* @desc clean all build results from project */
	return del(paths.documentation.concat([paths.distribution]));
};

function test() {
	/* @desc execute the test suite */
	const reporter = spec();
	return gulp.src(paths.test)
		.pipe(tape({reporter: reporter}))
};

function watch() {
	const universalWatch = watchify(universalBundler);
	const clientWatch = watchify(clientBundler);

	/* @desc watch sources and build on change */
	return sequence(
		task(function(cb) {
			return build(cb);
		}, 'first-run'),
		task(function () {
			gulp.watch(paths.source, [task(incremental)]);
			gulp.watch(paths.fixtures, [task(copy)]);
			gulp.watch(paths.templates, [task(documentation)]);

			universalWatch.on('update', function(){
				util.log('Changes on universal chunk, performing atomic bundle...')
				universal(function(){
					util.log('Universal chunk updated (pew, pew!)')
				});
			});

			clientWatch.on('update', function(){
				util.log('Changes on client chunk, performing atomic bundle...')
				client(function(){
					util.log('Client chunk updated (pew, pew!)')
				});
			});

			util.log('Watching sources for changes, happy hacking ✊');
		}, 'watch-setup')
	)();
};

function help() {
	/* @desc list all public task */
	const tasks = Object.keys(gulp.tasks)
		.filter(function(name) { return name !== 'default' })
		.reduce(function(results, taskName) {
			const task = gulp.tasks[taskName];
			const match = (task.fn + '').match(/\/\*\s@desc\s(.*)?\s\*\//);

			return results.concat({
				name: task.name,
				description: match ? match[1] : ''
			});
		}, []);

	const length = tasks.map(function(task) { return task.name.length })
		.sort()
		.reverse()[0];

	const format = util.colors.cyan.bold;
	console.log();

	tasks.forEach(function(task) {
		const spacing = new Array(length + 4 - task.name.length).join(' ');
		util.log(`${format(task.name)}${spacing}– ${task.description}`);
	});

	console.log();
}

// Register public tasks
task(build);
task(test);
task(clean);
task(watch);
task(help);
task(watch, 'default');
