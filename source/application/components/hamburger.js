import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components';
import Icon from './common/icon';

export default Hamburger;

function Hamburger(props) {
	const verb = props.enabled ? 'Close' : 'Open';
	return (
		<StyledLink
			title={`${verb} navgiation ${props.shortcut.toString()}`}
			to={{...props.location, query: {...props.location.query, 'navigation-enabled': !props.enabled}}}
			>
			<StyledIcon
				base={props.base}
				symbol="menu"
				/>
			{verb} Navigation
		</StyledLink>
	);
}

Hamburger.propTypes = {
	base: t.string,
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
