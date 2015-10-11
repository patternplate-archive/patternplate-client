import React from 'react';
import {Link} from 'react-router';

// Does not work on the server side yet
import {normal} from './application.css';

export default function (props) {
	const routes = ['/', '/pattern', '/documentation'];

	return (
		<div className={normal}>
			<h1>Application 12</h1>
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
