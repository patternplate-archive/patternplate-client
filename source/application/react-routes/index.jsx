import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Router, {DefaultRoute, Route} from 'react-router';
import {EventEmitter} from 'events';

import Application from '../components';
import Content from '../components/content';
import Home from '../components/content/home';

const routes = (
	<Route name="root" path="/" handler={Application}>
		<DefaultRoute handler={Home}/>
		<Route name="pattern" path="/pattern/*" handler={Content}/>
	</Route>
);

function router(path = '/', data) {
	return new Promise(resolve => {
		const eventEmitter = new EventEmitter();

		Router.run(routes, path, (Handler, state) => {
			const appData = {...data, ...state, eventEmitter};
			resolve(ReactDOMServer.renderToString(<Handler {...appData}/>));
		});
	});
}

function client(data, el) {
	return new Promise(resolve => {
		const eventEmitter = new EventEmitter();

		Router.run(routes, Router.HistoryLocation, (Handler, state) => {
			const appData = {...data, ...state, eventEmitter};
			resolve(ReactDOM.render(<Handler {...appData}/>, el));
		});
	});
}

export default router;
export {client as client};
