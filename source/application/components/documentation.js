import React, {PropTypes as t} from 'react';
import styled from 'styled-components';
import Markdown from '../containers/markdown';

export default function Documentation(props) {
	return (
		<ScrollBox>
			<StyledDocumentation>
				<Markdown source={props.doc}/>
			</StyledDocumentation>
		</ScrollBox>
	);
}

Documentation.propTypes = {
	doc: t.string.isRequired
};

const ScrollBox = styled.div`
	height: 100%;
	overflow: scroll;
	-webkit-overflow-sroll: touch;
`;

const StyledDocumentation = styled.div`
	box-sizing: border-box;
	margin: 0 auto;
	width: 100%;
	max-width: 800px;
	padding: 30px;
`;
