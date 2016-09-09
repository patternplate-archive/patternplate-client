import React from 'react';
import remark from 'remark';
import emoji from 'remark-gemoji-to-emoji';
import vdom from 'remark-vdom';

import MarkdownLink from './markdown-link';
import MarkdownCode from './markdown-code';
import wrap from './wrap';

export default render;

function render(source, options) {
	const h = React.createElement;

	const components = {
		a: wrap(MarkdownLink, options),
		code: wrap(MarkdownCode)
	};

	const opts = {h, components};

	return remark()
		.use(vdom, opts)
		.use(emoji)
		.process(source)
		.contents;
}
