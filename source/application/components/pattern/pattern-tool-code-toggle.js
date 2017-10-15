import React from 'react';
import {Link} from '@marionebl/react-router';
import join from 'classnames';
import Icon from '../common/icon';

export default PatternToolCodeToogle;

function PatternToolCodeToogle(props) {
	const className = join(
		'pattern-control pattern-tool pattern-tool-code-toggle',
		{active: props.active}
	);

	const to = {
		pathname: props.location.pathname,
		query: {
			...props.location.query,
			'source-expanded': !props.active,
			'source': null
		}
	};

	return (
		<Link
			to={to}
			className={className}
			title={props.title}
			>
			<Icon
				base={props.base}
				symbol="code"
				description="Code"
				/>
		</Link>
	);
}
