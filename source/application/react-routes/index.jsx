import React from 'react';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';
import Router from 'react-router';
import {EventEmitter} from 'events';

import Application from '../components';
import Content from '../components/content';
import Home from '../components/home';

const routes = (
	<Route name="root" path="/" handler={Application}>
		<DefaultRoute handler={Home} />
		<Route name="pattern" path="/pattern/*" handler={Content} />
	</Route>
);

function router(path = '/', data) {
	return new Promise(function(resolve){
		let eventEmitter = new EventEmitter();

		Router.run(routes, path, function(Handler, state){
			let appData = Object.assign({}, data, state, { eventEmitter });
			resolve(React.renderToString(<Handler {...appData}/>));
		});
	});
}

function client(data, el) {
	return new Promise(function(resolve){
		let eventEmitter = new EventEmitter();

		Router.run(routes, Router.HistoryLocation, function(Handler, state){
			let appData = Object.assign({}, data, state, { eventEmitter });
			resolve(React.render(<Handler {...appData}/>, el));
		});
	});
}

export default router;
export {client as client};
