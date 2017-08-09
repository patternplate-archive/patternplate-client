import React, {PropTypes as t} from 'react';
import styled from 'styled-components';
import Markdown from '../containers/markdown';

export default Documentation;

const ScrollBox = styled.div`
	height: 100%;
	overflow: scroll;
	-webkit-overflow-sroll: touch;
`;

const StyledDocumentation = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 900px;
`;

function Documentation(props) {
	return (
		<ScrollBox>
			<StyledDocumentation>
				<Markdown source={props.doc.contents} base={props.base}/>
			</StyledDocumentation>
		</ScrollBox>
	);
}

Documentation.propTypes = {
	base: t.string.isRequired,
	doc: t.shape({
		contents: t.string.isRequired
	}).isRequired
};
