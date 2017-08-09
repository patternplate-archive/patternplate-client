import frontmatter from 'front-matter';
import React, {PropTypes as t} from 'react';
import remark from 'remark';
import emoji from 'remark-gemoji-to-emoji';
import reactRenderer from 'remark-react';
import styled from 'styled-components';

import MarkdownHeadline from './markdown-headline';

export default Markdown;

function Markdown(props) {
	return (
		<StyledMarkdown>
			{
				remark()
					.use(reactRenderer, {
						sanitize: true,
						remarkReactComponents: {
							h1: is('h1')(MarkdownHeadline),
							h2: is('h2')(MarkdownHeadline),
							h3: is('h3')(MarkdownHeadline),
							h4: is('h4')(MarkdownHeadline),
							h5: is('h5')(MarkdownHeadline),
							h6: is('h6')(MarkdownHeadline)
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

`;

function is(is) {
	return Component => props => <Component is={is} {...props}/>;
}
