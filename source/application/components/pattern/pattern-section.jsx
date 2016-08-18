import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import pure from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import join from 'classnames';
import {pick, isEqual} from 'lodash';

import 'isomorphic-fetch';

import PatternLoader from './pattern-loader';
import PatternContent from './pattern-content';

@pure
@autobind
class PatternSection extends React.Component {
	static propTypes = {
		id: t.string.isRequired,
		data: t.object,
		config: t.object.isRequired,
		environment: t.string.isRequired,
		location: t.object.isRequired,
		onDataRequest: t.func.isRequired,
		type: t.string.isRequired
	};

	static defaultProps = {
		environment: 'index',
		onDataRequest: () => {}
	};

	componentDidMount() {
		const {id, environment, type} = this.props;
		if (type === 'pattern') {
			this.props.onDataRequest(id, {environment}, {loading: true});
		}
	}

	componentWillReceiveProps(nextProps) {
		const next = pick(nextProps, ['id', 'environment']);
		const current = pick(this.props, ['id', 'environment']);
		const query = {environment: next.environment};
		const options = {loading: next.id !== current.id};
		if (nextProps.type === 'pattern' && !isEqual(next, current)) {
			this.props.onDataRequest(next.id, query, options);
		}
	}

	handleDataRequest(id, query, options) {
		this.props.onDataRequest(id, query, options);
	}

	render() {
		const {props} = this;
		const {location, data, config} = props;
		const loading = data && data.loading;

		const fragments = this.props.id.split('/');
		const paths = fragments
			.map((fragment, index) => {
				return {
					name: fragment,
					path: fragments.slice(0, index + 1).join('/')
				};
			});

		const theme = location.query.theme || 'light';
		const inverted = theme === 'dark';

		const className = join('pattern-section', {
			[`pattern-section--loading`]: loading
		});

		return (
			<section className={className}>
				<CSSTransitionGroup
					component="ul"
					transitionName="pattern-content-transition"
					key="breadcrumbs"
					className="pattern-breadcrumbs"
					transitionEnterTimeout={300}
					transitionLeave={false}
					>
					{paths.map(path => {
						return (
							<li className="pattern-breadcrumb" key={path.name}>
								<Link
									to={{
										pathname: ['/pattern', path.path].join('/'),
										query: location.query
									}}
									title={`Navigate to ${path.path}`}
									>
									<span>{path.name}</span>
								</Link>
							</li>
						);
					})}
				</CSSTransitionGroup>
				<CSSTransitionGroup
					component="div"
					className="pattern-container"
					transitionName="pattern-content-transition"
					transitionEnterTimeout={300}
					transitionLeave={false}
					>
					{
						loading ?
							<PatternLoader
								key="pattern-loader"
								inverted={inverted}
								/> :
							<PatternContent
								id={props.id}
								data={data}
								config={config}
								location={location}
								loading={loading}
								onDataRequest={this.handleDataRequest}
								/>
					}
				</CSSTransitionGroup>
			</section>
		);
	}
}

export default PatternSection;
