import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {connect} from 'react-redux';

import Application from '../components';
import Content from '../components/content';
import Home from '../components/content/home';

const ConnectedApplication = connect(state => state)(Application);

const ConnectedHome = connect(state => {
	return {readme: state.schema.readme};
})(Home);

const ConnectedContent = connect(state => {
	const {config, navigation, patterns, messages, time} = state;
	return {config, navigation, patterns, messages, time};
})(Content);

export default function () {
	return (
		<Route path="/" component={ConnectedApplication}>
			<IndexRoute component={ConnectedHome}/>
			<Route path="/pattern/*" component={ConnectedContent}/>
		</Route>
	);
}
