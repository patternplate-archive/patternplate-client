import React from 'react';

import Icon from '../common/icon.jsx';

class PatternLoader extends React.Component {
	displayName = 'PatternLoader';

	render () {
		return (
			<div className="pattern-loader">
				<Icon inline={true} symbol="patternplate-loading">Loading ...</Icon>
			</div>
		);
	}
}

export default PatternLoader;
