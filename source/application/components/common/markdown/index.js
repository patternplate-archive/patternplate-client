import React, {PropTypes as t} from 'react';
import styled from 'styled-components';
import render from './render';

export default Markdown;

function Markdown(props) {
	return (
		<StyledMarkdown>
			{
				render(props.source, {
					base: props.base,
					hash: props.hash,
					query: props.query,
					pathname: props.pathname,
					onHashChange: props.scrollTo
				})
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
