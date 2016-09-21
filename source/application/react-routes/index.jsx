import url from 'url';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Router, {DefaultRoute, Route} from 'react-router';
import {EventEmitter} from 'events';

import Application from '../components';
import Content from '../components/content';
import Home from '../components/content/home';

function getRoutes(base = '/') {
	return (
		<Route name="root" path={base} handler={Application}>
			<DefaultRoute handler={Home}/>
			<Route name="pattern" path="/pattern/*" handler={Content}/>
		</Route>
	);
}

function router(path = '/', data) {
	return new Promise(resolve => {
		const eventEmitter = new EventEmitter();

		Router.run(getRoutes(), path, (Handler, state) => {
			const appData = {...data, ...state, eventEmitter, base: '/'};
			resolve(ReactDOMServer.renderToString(<Handler {...appData}/>));
		});
	});
}

function client(data, el) {
	return new Promise(resolve => {
		const eventEmitter = new EventEmitter();
		const base = url.resolve(global.location.pathname, data.base);

		Router.run(getRoutes(base), Router.HistoryLocation, (Handler, state) => {
			const appData = {...data, ...state, eventEmitter, base};
			resolve(ReactDOM.render(<Handler {...appData}/>, el));
		});
	});
}

export default router;
export {client as client};
