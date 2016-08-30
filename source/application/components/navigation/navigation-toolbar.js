import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';

import NavigationToggle from './navigation-toggle';

export default function NavigationToolbar(props) {
	// const {data} = props;
	const issue = {
		...props.location,
		query: {
			...props.location.query,
			issue: true
		}
	};
	const cons = {
		...props.location,
		query: {
			...props.location.query,
			lightbox: 'console'
		}
	};
	return (
		<div className="navigation-toolbar">
			<div className="navigation-toolbar__container">
				<ul className="navigation-toolbar__links">
					<li className="navigation-toolbar__link">
						<Link to={issue}>
							Issue
						</Link>
					</li>
					<li className="navigation-toolbar__link">
						<Link to={cons}>
							Console
						</Link>
					</li>
				</ul>
				{/* <div className="navigation-meta">
					<div className="navigation-meta__handle">
						v{data.version}
					</div>
				</div>*/}
			</div>
			<div className="navigation-toolbar__action">
				<NavigationToggle
					base={props.base}
					expanded={props.expanded}
					location={props.location}
					/>
			</div>
		</div>
	);
}

NavigationToolbar.propTypes = {
	children: t.any,
	location: t.object.isRequired,
	expanded: t.bool.isRequired,
	base: t.string.isRequired,
	/* data: t.shape({
		name: t.string.isRequired,
		version: t.string.isRequired,
		appName: t.string.isRequired,
		appVersion: t.string.isRequired,
		clientName: t.string.isRequired,
		clientVersion: t.string.isRequired,
		serverName: t.string.isRequired,
		serverVersion: t.string.isRequired
	}).isRequired */
};
