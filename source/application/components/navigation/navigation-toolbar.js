import React, {PropTypes as t} from 'react';
import NavigationToggle from './navigation-toggle';

export default function NavigationToolbar(props) {
	const {data} = props;
	return (
		<div className="navigation-toolbar">
			<div className="navigation-toolbar__container">
				<div className="navigation-meta">
					<div className="navigation-meta__handle">
						{/* <span className="navigation-meta__cruft">
							About {data.name}
						</span>*/}
						<span> v{data.version}</span>
					</div>
					{/* <div className="navigation-meta__data">
						<div>{data.appName} v{data.appVersion}</div>
						<div>{data.clientName} v{data.clientVersion}</div>
						<div>{data.serverName} v{data.serverVersion}</div>
					</di>*/}
				</div>
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
	data: t.shape({
		name: t.string.isRequired,
		version: t.string.isRequired,
		appName: t.string.isRequired,
		appVersion: t.string.isRequired,
		clientName: t.string.isRequired,
		clientVersion: t.string.isRequired,
		serverName: t.string.isRequired,
		serverVersion: t.string.isRequired
	}).isRequired
};
