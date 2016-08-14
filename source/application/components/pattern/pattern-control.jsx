import React, {PropTypes as t, Component} from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import pure from 'pure-render-decorator';
import autobind from 'autobind-decorator';

@pure
@autobind
class PatternControl extends Component {
	static propTypes = {
		active: t.bool.isRequired,
		name: t.any.isRequired,
		location: t.object.isRequired,
		shortid: t.string.isRequired,
		title: t.string,
		iconDescription: t.string
	}

	static contextTypes = {
		router: t.any
	};

	handleClick(e) {
		e.preventDefault();
		const {active, location, shortid} = this.props;
		const source = active ? null : shortid;
		const route = {pathname: location.pathname, query: {...location.query, source}};
		this.context.router.replace(route);
	}

	render() {
		const {active, name, location, shortid, title} = this.props;
		const className = classnames('pattern-control', {active});
		const source = active ? null : shortid;

		return (
			<Link
				to={{pathname: location.pathname, query: {...location.query, source}}}
				className={className}
				onClick={this.handleClick}
				title={title}
				>
				{name}
			</Link>
		);
	}
}

export default PatternControl;
