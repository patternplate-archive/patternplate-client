import React from 'react';
import Toolbar from './navigation/toolbar';
import Navigation from './navigation/index';

export default Application;

function Application(p) {
	return (
		<div className="application">
			<Toolbar
				theme={p.theme}
				title={p.title}
				base={p.base}
				location={p.location}
				/>
			<Navigation
				base={p.base}
				hierarchy={p.hierarchy}
				navigation={p.navigation}
				onSearch={p.onSearch}
				path={p.path}
				pathname={p.pathname}
				query={p.query}
				location={p.location}
				searchValue={p.search}
				/>
			{p.children}
		</div>
	);
}
