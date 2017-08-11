import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components';

import Icon from './common/icon';

export default Opacity;

function Opacity(props) {
	if (!props.active) {
		return null;
	}

	const verb = props.enabled ? 'Disable' : 'Enable';
	return (
		<StyledLink
			title={`${verb} opacity indicators ${props.shortcut.toString()}`}
			to={{...props.location, query: {...props.location.query, opacity: !props.enabled}}}
			>
			<StyledIcon symbol="opacity"/>
			{verb} opacity indicators
		</StyledLink>
	);
}

Opacity.propTypes = {
	active: t.bool,
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
