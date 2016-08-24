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
		base: t.string.isRequired,
		children: t.any,
		expand: t.bool,
		iconDescription: t.string,
		location: t.object.isRequired,
		name: t.any.isRequired,
		shortid: t.string.isRequired,
		title: t.string
	}

	static contextTypes = {
		router: t.any
	};

	handleClick(e) {
		e.preventDefault();
		const {active, expand, location, shortid} = this.props;
		const source = active ? null : shortid;
		const route = {
			pathname: location.pathname,
			query: {
				...location.query,
				source,
				[`source-expanded`]: expand
			}
		};
		this.context.router.replace(route);
	}

	render() {
		const {active, expand, name, location, shortid, title} = this.props;
		const className = classnames('pattern-control', {active});
		const source = active ? null : shortid;

		const to = {
			pathname: location.pathname,
			query: {
				...location.query,
				source,
				[`source-expanded`]: expand
			}
		};

		return (
			<Link
				to={to}
				className={className}
				onClick={this.handleClick}
				title={title}
				>
				{this.props.children || name}
			</Link>
		);
	}
}

export default PatternControl;
