import highlight from 'highlight.js/lib/highlight.js';
import {pd as pretty} from 'pretty-data';

import less from 'highlight.js/lib/languages/less.js';
import css from 'highlight.js/lib/languages/css.js';
import js from 'highlight.js/lib/languages/javascript.js';
import xml from 'highlight.js/lib/languages/xml.js';

const languages = ['less', 'css', 'html', 'js'];

highlight.registerLanguage('less', less);
highlight.registerLanguage('css', css);
highlight.registerLanguage('js', js);
highlight.registerLanguage('jsx', js);
highlight.registerLanguage('html', xml);
highlight.registerLanguage('xml', xml);

highlight.configure({
	tabReplace: '  ',
	languages
});

global.onmessage = event => {
	const {data} = event;
	const {payload: code, id, language: passedLanguage} = JSON.parse(data);

	const {value, language} = languages.includes(passedLanguage) ?
		{value: highlight.highlight(passedLanguage, code).value, language: passedLanguage} :
		highlight.highlightAuto(code);

	// If html is detected, reformat it
	const payload = language === 'html' ?
		highlight.highlight('html', pretty.xml(code)).value :
		value;

	global.postMessage(JSON.stringify({id, payload}));
};
