import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Application from '../containers/application';
import Content from '../containers/content';
import NotFound from '../containers/not-found';
import Home from '../containers/home';

export default function () {
	return (
		<Route path="/" component={Application}>
			<IndexRoute component={Home}/>
			<Route path="pattern/*" component={Content}/>
			<Route path="*" component={NotFound}/>
		</Route>
	);
}
