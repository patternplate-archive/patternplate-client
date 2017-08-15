import React, {PropTypes as t} from 'react';
import Link from './link';

export default ToggleButton;

function ToggleButton(props) {
	return (
		<Link
			className={props.className}
			title={`${props.shortcut.description(props)} ${props.shortcut.toString()}`}
			query={{[props.shortcut.key]: !props.enabled}}
			>
			{props.children}
		</Link>
	);
}

ToggleButton.propTypes = {
	className: t.string,
	children: t.string,
	enabled: t.bool.isRequired,
	shortcut: t.shape({
		description: t.func.isRequired,
		toString: t.func.isRequired,
		action: t.shape({
			key: t.string.isRequired
		}).isRequired
	}).isRequired
};
