import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';

import routes from './routes';

export default function (location, data) {
	return new Promise((resolve, reject) => {
		match({
			routes: routes(data),
			location
		}, (error, redirect, props) => {
			if (error) {
				return reject(error);
			}
			const context = <RouterContext {...props}/>;
			const result = renderToString(context);
			resolve(result);
		});
	});
}
