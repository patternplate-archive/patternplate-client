import frontmatter from 'front-matter';
import React, {PropTypes as t} from 'react';
import remark from 'remark';
import emoji from 'remark-gemoji-to-emoji';
import reactRenderer from 'remark-react';
import styled from 'styled-components';

import MarkdownBlockQuote from './markdown-blockquote';
import MarkdownCode from './markdown-code';
import MarkdownCodeBlock from './markdown-code-block';
import MarkdownCopy from './markdown-copy';
import MarkdownHeadline from './markdown-headline';
import MarkdownHr from './markdown-hr';
import MarkdownImage from './markdown-image';
import MarkdownItem from './markdown-item';
import MarkdownList from './markdown-list';
import MarkdownLink from './markdown-link';

export default Markdown;

function Markdown(props) {
	return (
		<StyledMarkdown className={props.className}>
			{
				remark()
					.use(reactRenderer, {
						sanitize: false,
						remarkReactComponents: {
							a: MarkdownLink,
							blockquote: MarkdownBlockQuote,
							code: MarkdownCode,
							h1: is('h1')(MarkdownHeadline),
							h2: is('h2')(MarkdownHeadline),
							h3: is('h3')(MarkdownHeadline),
							h4: is('h4')(MarkdownHeadline),
							h5: is('h5')(MarkdownHeadline),
							h6: is('h6')(MarkdownHeadline),
							hr: MarkdownHr,
							img: MarkdownImage,
							li: MarkdownItem,
							p: MarkdownCopy,
							pre: MarkdownCodeBlock,
							ul: is('ul')(MarkdownList),
							ol: is('ol')(MarkdownList)
						}
					})
					.use(emoji)
					.processSync(frontmatter(props.source).body)
					.contents
			}
		</StyledMarkdown>
	);
}

Markdown.propTypes = {
	base: t.string.isRequired,
	className: t.string,
	hash: t.string.isRequired,
	pathname: t.string.isRequired,
	query: t.object.isRequired,
	scrollTo: t.func.isRequired,
	source: t.string
};

const StyledMarkdown = styled.div`
	& table {
		text-align: left;
		display: block;
		width: 100%;
		overflow: auto;
		margin: 0 0 16px 0;
		border-spacing: 0;
		border-collapse: collapse;
		font-size: 18px;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}
	& tr {
		color: ${props => props.theme.color};
		border-top: 1px solid ${props => props.theme.border};
		background: transparent;
	}
	& tr:nth-child(2n) {
		background: ${props => props.theme.backgroundTertiary}
	}
	& th {
		padding: 6px 13px;
		border: 1px solid ${props => props.theme.border};
		font-weight: 600;
	}
	& td {
		padding: 6px 13px;
		border: 1px solid ${props => props.theme.border};
	}
`;

function is(is) {
	return Component => props => <Component is={is} {...props}/>;
}
