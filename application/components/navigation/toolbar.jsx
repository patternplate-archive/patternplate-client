import React from 'react';
import {Link} from 'react-router';

class Toolbar extends React.Component {
	displayName = 'Toolbar';

	render () {
		return (
			<header className="header">
				<div className="logo">
					<Link to="root">{ this.props.schema.name }</Link>
				</div>
			</header>
		);
	}
}

export default Toolbar;
