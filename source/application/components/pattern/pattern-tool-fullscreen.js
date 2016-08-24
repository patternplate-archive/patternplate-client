import React from 'react';
import Icon from '../common/icon';

import urlQuery from '../../utils/url-query';

export default PatternToolFullscreen;

function PatternToolFullscreen(props) {
	const href = urlQuery.format({
		pathname: `${props.base}demo/${props.id}/index.html`,
		query: {
			environment: props.environment
		}
	});
	return (
		<a
			className="pattern-tool pattern-fullscreen-tool"
			target="_blank"
			rel="noopener"
			href={href}
			>
			<Icon
				base={props.base}
				symbol="fullscreen"
				description="Fullscreen"
				/>
		</a>
	);
}
