import path from 'path';

import urlQuery from '../utils/url-query';

const getPatternDemo = require('patternplate-server/library/get-pattern-demo');
const getPatternFile = require('patternplate-server/library/get-pattern-file');

function withErrorHandling(fn) {
	return async function(...args) {
		try {
			const result = await fn(...args);
			return [null, result];
		} catch (error) {
			return [error];
		}
	};
}

function getPatternId(raw) {
	const parsed = path.parse(raw);
	const extension = getPatternExtension(raw);
	const base = path.basename(raw, path.extname(raw));

	if (base === 'index' && extension !== 'json') {
		return path.dirname(raw);
	}

	return `${path.dirname(raw)}/${path.basename(parsed.base, path.extname(parsed.base))}`;
}

function getPatternExtension(raw) {
	return path.extname(raw).slice(1) || 'html';
}

const getPatternDemoOrError = withErrorHandling(getPatternDemo);
const getPatternFileOrError = withErrorHandling(getPatternFile);

export default function patternRouteFactory(application) {
	return async function patternRoute() {
		const server = application.parent.server;
		const parsed = urlQuery.parse(this.params.id);
		const id = getPatternId(parsed.pathname);
		const extension = getPatternExtension(parsed.pathname);
		const type = this.accepts('text', 'html', 'json') || extension;
		const errorType = type === 'json' ? 'json' : 'html';
		const {environment = 'index'} = parsed.query;

		const filters = {
			outFormats: [extension],
			environments: [environment].filter(Boolean)
		};

		if (type === 'html' && extension === 'html') {
			const [error, demo] = await getPatternDemoOrError(server, id, filters, environment, {
				mount: this.query.mount !== 'false'
			});

			if (error) {
				console.log(error);
				error.expose = true;
				this.throw(500, error);
				return;
			}

			if (demo === null) {
				const err = new Error(`Could not find demo for ${id}.`);
				err.file = __filename;
				this.throw(404, err);
				return;
			}

			this.type = 'html';
			this.body = demo;
			return;
		}

		const [error, file] = await getPatternFileOrError(application.parent.server, id, filters, extension, environment);

		if (error) {
			console.log(error);
			error.expose = true;
			this.type = errorType;
			this.throw(500, error);
		}

		if (file === null) {
			this.type = errorType;
			const err = new Error(`Could not find file {index,demo}.${extension} for ${id}.`);
			err.file = __filename;
			this.throw(404, err);
		}

		this.type = extension;
		this.body = file;
	};
}
