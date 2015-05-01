import React from 'react';
import {RouteHandler} from 'react-router';

import PatternSection from '../pattern/pattern-section.jsx';

class Content extends React.Component {
	displayName = 'Content';

	render () {
		return (
			<main className="content">
				<PatternSection id={this.props.params.splat} />
			</main>
		);
	}
}

export default Content;
