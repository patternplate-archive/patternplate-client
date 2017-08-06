import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Application from './containers/application';
import Content from './containers/content';
import Documentation from './containers/documentation';
import NotFound from './containers/not-found';
import Home from './containers/home';

export default function (store) {
	const state = store.getState();
	return (
		<Route path={state.base} component={Application}>
			<IndexRoute component={Home}/>
			<Route path="pattern/*" component={Content}/>
			<Route path="doc/*" component={Documentation}/>
			<Route path="*" component={NotFound}/>
		</Route>
	);
}
