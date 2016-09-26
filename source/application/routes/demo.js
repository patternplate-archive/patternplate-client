import path from 'path';

import urlQuery from '../utils/url-query';

const getPatternDemo = require('patternplate-server/library/get-pattern-demo');
const getPatternFile = require('patternplate-server/library/get-pattern-file');

function withErrorHandling(fn) {
	return async function(...args) {
		try {
			const result = await fn(...args);
			return [null, result || ''];
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
		const parsed = urlQuery.parse(this.params.id);
		const id = getPatternId(parsed.pathname);
		const extension = getPatternExtension(parsed.pathname);
		const type = this.accepts('text', 'html', 'json') || extension;
		const {environment = 'index'} = parsed.query;

		const filters = {
			outFormats: [extension],
			environments: [environment].filter(Boolean)
		};

		if (type === 'html' && extension === 'html') {
			const [error, demo] = await getPatternDemoOrError(application.parent.server, id, filters, environment);

			if (error) {
				console.log(error.message);
				if (error.stack) {
					console.trace(error.stack);
				}
				this.throw(error);
			}

			this.type = 'html';
			this.body = demo;
			return;
		}

		const [error, file] = await getPatternFileOrError(application.parent.server, id, filters, extension, environment);

		if (error) {
			this.throw(error);
		}

		this.type = extension;
		this.body = file;
	};
}
