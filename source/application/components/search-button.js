import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components';
import Icon from './common/icon';

export default SearchButton;

function SearchButton(props) {
	return (
		<StyledLink
			title={`Enable search ${props.shortcut.toString()}`}
			to={{...props.location, query: {...props.location.query, 'search-enabled': !props.enabled}}}
			>
			Search
			<Icon
				base={props.base}
				symbol="search"
				/>
		</StyledLink>
	);
}

SearchButton.propTypes = {
	base: t.string,
	enabled: t.bool,
	location: t.any,
	shortcut: t.any
};

const StyledLink = styled(Link)`
	height: 34px;
	width: 34px;
	font-size: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;
