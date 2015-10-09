import React from 'react';
import {Route} from 'react-router';
import {
	Application,
	Documentation,
	Home,
	NotFound,
	Pattern
} from '../containers';

export default (
	<Route component={Application}>
		<Route path="/" component={Home} />
		<Route path="/documentation(/:path)*" component={Documentation} />
		<Route path="/pattern(/:path)*" component={Pattern} />
		<Route path="*" component={NotFound} />
	</Route>
);
