import low from 'lowlight/lib/core';
import ARSON from 'arson';
import {pd as pretty} from 'pretty-data';

import css from 'highlight.js/lib/languages/css.js';
import less from 'highlight.js/lib/languages/less.js';
import scss from 'highlight.js/lib/languages/scss.js';
import stylus from 'highlight.js/lib/languages/stylus.js';

import js from 'highlight.js/lib/languages/javascript.js';
import ts from 'highlight.js/lib/languages/typescript.js';
import json from 'highlight.js/lib/languages/json.js';

import xml from 'highlight.js/lib/languages/xml.js';
import md from 'highlight.js/lib/languages/markdown.js';

import bash from 'highlight.js/lib/languages/bash.js';

// CSS and friends
low.registerLanguage('css', css);
low.registerLanguage('less', less);
low.registerLanguage('scss', scss);
low.registerLanguage('stylus', stylus);

// JS and friends
low.registerLanguage('js', js);
low.registerLanguage('javascript', js);
low.registerLanguage('jsx', js);
low.registerLanguage('ts', ts);
low.registerLanguage('tsx', ts);
low.registerLanguage('typescript', ts);
low.registerLanguage('json', json);

// HTML and friends
low.registerLanguage('html', xml);
low.registerLanguage('xml', xml);
low.registerLanguage('md', md);
low.registerLanguage('markdown', md);

// (s)hell(ish)s
low.registerLanguage('bash', bash);
// low.registerLanguage('shell', bash);

function highlight(language, source, options) {
	const code = ['xml', 'html'].includes(language) ? pretty.xml(source) : source;
	const {value: children} = low.highlight(language, code, options);
	return children;
}

global.onmessage = event => {
	const {data} = event;
	const {payload, id, language, options = {}} = ARSON.parse(data);

	try {
		if (!payload) {
			console.warn('lowlight request without payload, skipping');
			return;
		}

		if (!language) {
			console.warn('lowlight request without language payload, skipping');
			return;
		}

		const children = highlight(language, payload, options);

		global.postMessage(ARSON.stringify({
			id,
			payload: {type: 'element', tagName: 'div', children}
		}));
	} catch (error) {
		global.postMessage(ARSON.stringify({
			id,
			payload: {type: 'error', error}
		}));
	}
};
