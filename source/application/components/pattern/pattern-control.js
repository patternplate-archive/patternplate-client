import React, {PropTypes as t, Component} from 'react';
import {Link} from '@marionebl/react-router';
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
		disabled: t.bool,
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
		const {props} = this;
		const {active, location} = props;
		const className = classnames('pattern-control', {active});
		const source = props.active ? null : props.shortid;

		const to = {
			pathname: location.pathname,
			query: {
				...location.query,
				source,
				[`source-expanded`]: props.expand
			}
		};

		return (
			<Link
				to={to}
				className={className}
				disabled={props.disabled}
				onClick={this.handleClick}
				title={props.title}
				>
				{props.children || props.name}
			</Link>
		);
	}
}

export default PatternControl;
