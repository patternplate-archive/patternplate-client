import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';
import join from 'classnames';

import Icon from '../common/icon';

export default function NavigationToggle(props) {
	const {location, expanded, base} = props;
	const iconClassName = join({
		'icon--mirrored': expanded
	});

	return (
		<Link
			to={{
				pathname: location.pathname,
				query: {...location.query, ...{expanded: !expanded}}
			}}
			className="toggleMode"
			title={expanded ? 'Collapse navigation' : 'Expand navigation'}
			>
			<Icon base={base} className={iconClassName} symbol="arrow-double-right"/>
		</Link>
	);
}

NavigationToggle.propTypes = {
	location: t.object.isRequired,
	expanded: t.bool.isRequired,
	base: t.string.isRequired
};
