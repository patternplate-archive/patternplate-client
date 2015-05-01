import React from 'react';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';
import Router from 'react-router';

import Application from '../components/';
import Content from '../components/content';
import Home from '../components/content/home';

const routes = (
	<Route path="/" handler={Application}>
		<DefaultRoute handler={Home} />
		<Route name="pattern" path="/pattern/*" handler={Content} />
	</Route>
);

function router(path = '/', data) {
	return new Promise(function(resolve){
		Router.run(routes, path, function(Handler, state){
			let appData = Object.assign({}, data, state);
			resolve(React.renderToString(<Handler {...appData}/>));
		});
	});
}

export default router;
