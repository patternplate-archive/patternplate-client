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

function getLanguageCandidates(language) {
	const detected = low.getLanguage(language);

	if (!detected) {
		return [];
	}

	if (!detected.aliases || detected.aliases.length === 0) {
		return [language];
	}

	return detected.aliases;
}

global.onmessage = event => {
	const {data} = event;
	const {payload: passed, id, language, options = {}} = ARSON.parse(data);

	if (!passed) {
		console.warn('lowlight request without payload, skipping');
		return;
	}

	if (!language) {
		console.warn('lowlight request without language payload, skipping');
		return;
	}

	const candidates = getLanguageCandidates(language);

	if (candidates.length === 0) {
		return;
	}

	const prettify = candidates.includes('xml') || candidates.includes('html');
	const code = prettify ? pretty.xml(passed) : passed;

	const {value: children} = language ?
		low.highlight(language, code, options) :
		low.highlightAuto(code, options);

	const payload = {type: 'element', tagName: 'div', children};
	global.postMessage(ARSON.stringify({id, payload}));
};
