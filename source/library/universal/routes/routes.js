import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {
	Application,
	Documentation,
	Home,
	NotFound,
	Pattern
} from '../containers';

export default (
	<Route path="/" component={Application}>
		<IndexRoute component={Home} />
		<Route path="/documentation(/:path)*" component={Documentation} />
		<Route path="/pattern(/:path)*" component={Pattern} />
		<Route path="*" component={NotFound} />
	</Route>
);
