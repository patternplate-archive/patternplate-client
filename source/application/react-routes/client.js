import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

import routes from './routes';

export default function (data, el) {
	const router = (
		<Router history={browserHistory}>
			{routes(data)}
		</Router>
	);

	return render(router, el);
}
