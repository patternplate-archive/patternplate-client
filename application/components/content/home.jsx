import React from 'react';
import {RouteHandler} from 'react-router';

import Messages from './messages.jsx'

class Home extends React.Component {
	displayName = 'Home';

	render () {
		let readme = this.props.schema.readme || '';

		return (
			<main className="content home">
				<div className="markdown" dangerouslySetInnerHTML={{'__html': readme}} />
				<Messages eventEmitter={this.props.eventEmitter} />
			</main>
		);
	}
}

export default Home;
