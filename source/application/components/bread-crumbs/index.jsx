import React from 'react';
import {Link} from 'react-router';
import join from 'classnames';

export default BreadCrumbs;

function BreadCrumbs(props) {
	const {crumbs} = props;
	const className = join('breadcrumbs', props.className);

	return (
		<ul className={className}>
			{
				crumbs.map(crumb => {
					return (
						<BreadCrumb
							key={crumb.id}
							name={crumb.name}
							navigateable={crumb.navigateable}
							target={crumb.target}
							/>
					);
				})
			}
		</ul>
	);
}

function BreadCrumb(props) {
	const className = join('breadcrumb', {
		'breadcrumb--navigateable': props.navigateable
	});
	return (
		<li className={className}>
			{
				props.navigateable ?
					<Link to={props.target}>
						{props.name}
					</Link> :
					<span>
						{props.name}
					</span>
			}
		</li>
	);
}
