import React, {PropTypes as t} from 'react';
import styled from 'styled-components';

import Icon from './common/icon';
import ToggleButton from './common/toggle-button';

export default CodeButton;

function CodeButton(props) {
	if (!props.active) {
		return null;
	}

	const verb = props.enabled ? 'Hide' : 'Show';
	const title = `${verb} code view`;

	return (
		<StyledToggleButton
			enabled={props.enabled}
			property="code-enabled"
			title={`${title} ${props.shortcut.toString()}`}
			>
			<StyledIcon symbol="opacity"/>{title}
		</StyledToggleButton>
	);
}

CodeButton.propTypes = {
	active: t.bool,
	enabled: t.bool,
	shortcut: t.any
};

const StyledIcon = styled(Icon)`
	fill: ${props => props.theme.tint};
`;

const StyledToggleButton = styled(ToggleButton)`
	font-size: 0;
	line-height: 0;
`;
