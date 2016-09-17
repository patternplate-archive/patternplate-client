import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';
import join from 'classnames';

import Icon from '../common/icon';

export default function NavigationToggle(props) {
	const iconClassName = join({
		'icon--mirrored': props.expanded
	});

	return (
		<Link
			to={{
				pathname: props.pathname,
				query: {...props.query, ...{expanded: !props.expanded}}
			}}
			className="toggleMode"
			title={props.expanded ? 'Collapse navigation [ctrl+e]' : 'Expand navigation [ctrl+e]'}
			>
			<Icon base={props.base} className={iconClassName} symbol="arrow-double-right"/>
		</Link>
	);
}

NavigationToggle.propTypes = {
	base: t.string.isRequired,
	expanded: t.bool.isRequired,
	pathname: t.string.isRequired,
	query: t.object.isRequired
};
