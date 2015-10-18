import React from 'react';
import {Link} from 'react-router';

import {normal, foo} from './application.css';

export default function (props) {
	const routes = ['/', '/pattern', '/documentation'];

	return (
		<div className={normal}>
			<h1 className={foo}>Application 12</h1>
			{props.children}
			<ul>
				{
					routes.map((route, index) => {
						return (<li key={index}>
							<Link to={route}>{route}</Link>
						</li>);
					})
				}
			</ul>
		</div>
	);
}
