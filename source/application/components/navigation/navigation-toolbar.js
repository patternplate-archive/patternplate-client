import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';

import Icon from '../common/icon';
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

	const cheatsheet = {
		...props.location,
		query: {
			...props.location.query,
			lightbox: 'shortcuts'
		}
	};

	return (
		<div className="navigation-toolbar">
			<div className="navigation-toolbar__container">
				<ul className="navigation-toolbar__links">
					<li className="navigation-toolbar__link">
						<Link
							className="button"
							title="Report an issue [ctrl+i]"
							to={issue}
							>
							<Icon symbol="issue"/>
						</Link>
					</li>
					<li className="navigation-toolbar__link">
						<Link
							className="button"
							title="Show keyboard shortcuts [ctrl+t]"
							to={cheatsheet}
							>
							<Icon symbol="command"/>
						</Link>
					</li>
				</ul>
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
	base: t.string.isRequired,
	children: t.any,
	location: t.object.isRequired,
	expanded: t.bool.isRequired
};
