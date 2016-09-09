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
	const h = React.createElement;
	const headline = wrap(MarkdownHeadline);

	const components = {
		a: wrap(MarkdownLink, options),
		code: wrap(MarkdownCode),
		h1: headline,
		h2: headline,
		h3: headline,
		h4: headline,
		h5: headline,
		h6: headline
	};

	const opts = {h, components};

	return remark()
		.use(vdom, opts)
		.use(emoji)
		.process(source)
		.contents;
}
