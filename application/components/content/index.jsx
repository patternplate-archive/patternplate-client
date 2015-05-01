import React from 'react';
import {RouteHandler} from 'react-router';

class Content extends React.Component {
	displayName = 'Content';

	render () {
		return (
			<main className="content">
				Content
				<RouteHandler {...this.props} />
			</main>
		);
	}
}

export default Content;
