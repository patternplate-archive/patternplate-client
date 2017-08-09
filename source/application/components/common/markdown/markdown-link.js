import styled from 'styled-components';

import Link from '../link';

export default styled(Link)`
	font-size: 18px;
	line-height: 27px;
	color: ${props => props.theme.color};
	text-decoration: none;
	&:link, &:visited {
		color: ${props => props.theme.active};
	}
	&:hover, &:active {
		text-decoration: underline;
	}
`;
