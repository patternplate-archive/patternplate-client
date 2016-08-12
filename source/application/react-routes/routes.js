import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Application from '../components';
import Content from '../components/content';
import Home from '../components/content/home';

function withData(Component, data) {
	return props => (<Component {...data} {...props}/>);
}

export default function (data = {}) {
	const homeData = {
		readme: data.schema.readme
	};

	const patternData = {
		config: data.config
	};

	return (
		<Route path="/" component={withData(Application, data)}>
			<IndexRoute component={withData(Home, homeData)}/>
			<Route path="/pattern/*" component={withData(Content, patternData)}/>
		</Route>
	);
}
