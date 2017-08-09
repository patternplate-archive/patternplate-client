import React, {PropTypes as t} from 'react';
import styled from 'styled-components';

const SIZES = {
	s: 12,
	m: 14,
	l: 16
};

export default Text;

function Text(props) {
	return <StyledText size={props.size} className={props.className}>{props.children}</StyledText>;
}

Text.propTypes = {
	className: t.string,
	children: t.string.isRequired,
	size: t.oneOf(['s', 'm', 'l']).isRequired
};

Text.defaultProps = {
	size: 'm'
};

const StyledText = styled.div`
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	font-size: ${props => SIZES[props.size]}px;
	line-height: ${props => SIZES[props.size]}px;
`;
