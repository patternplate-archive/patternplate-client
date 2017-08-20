import React from 'react';
import styled from 'styled-components';

// import Frame from '../common/frame';
// import Ruler from './pattern-ruler';

const StyledDemo = styled.iframe`
	width: 100%;
	height: 100%;
	border: 0;
`;

function PatternDemo(props) {
	return (
		<StyledDemo srcDoc={props.contents} seamless/>
	);
}

export default PatternDemo;
