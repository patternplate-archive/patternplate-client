import React from 'react';
import {RouteHandler} from 'react-router';

class Home extends React.Component {
	displayName = 'Home';

	render () {
		let readme = this.props.schema.readme || '';

		return (
			<main className="content home">
				<div className="markdown" dangerouslySetInnerHTML={{'__html': readme}} />
			</main>
		);
	}
}

export default Home;
