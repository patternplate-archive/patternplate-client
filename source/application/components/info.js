import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components';

import Icon from './common/icon';

export default Info;

function Info(props) {
	const verb = props.enabled ? 'Close' : 'Open';
	return (
		<StyledLink
			title={`${verb} info panel ${props.shortcut.toString()}`}
			to={{...props.location, query: {...props.location.query, 'info-enabled': !props.enabled}}}
			>
			<StyledIcon symbol="info"/>
			{verb} Info
		</StyledLink>
	);
}

Info.propTypes = {
	enabled: t.bool,
	location: t.any,
	shortcut: t.any
};

const StyledIcon = styled(Icon)`
	fill: ${props => props.theme.tint};
`;

const StyledLink = styled(Link)`
	font-size: 0;
	line-height: 0;
`;
