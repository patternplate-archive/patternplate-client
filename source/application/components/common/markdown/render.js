import gh from 'hast-util-sanitize/lib/github';
import {merge} from 'lodash';
import React from 'react';
import remark from 'remark';
import emoji from 'remark-gemoji-to-emoji';
import vdom from 'remark-vdom';

import MarkdownLink from './markdown-link';
import MarkdownCode from './markdown-code';
import MarkdownHeadline from './markdown-headline';
import wrap from './wrap';

export default render;

function render(source, options) {
	const {base, hash, highlights, highlight, query, pathname, onHashChange} = options;
	const h = React.createElement;
	const headline = wrap(MarkdownHeadline);

	const link = {base, hash, query, pathname, onHashChange};
	const code = {highlights, highlight};

	const components = {
		a: wrap(MarkdownLink, link),
		code: wrap(MarkdownCode, code),
		h1: headline,
		h2: headline,
		h3: headline,
		h4: headline,
		h5: headline,
		h6: headline
	};

	const sanitize = merge({}, gh);
	sanitize.attributes = {
		a: ['href', 'title'],
		code: ['className'],
		img: ['src', 'alt']
	};

	const opts = {h, components, sanitize};

	return remark()
		.use(vdom, opts)
		.use(emoji)
		.process(source)
		.contents;
}
