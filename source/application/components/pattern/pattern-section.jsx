import React, {PropTypes as types} from 'react';
import {Link} from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import pure from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import join from 'classnames';
import {pick, isEqual} from 'lodash';

import 'isomorphic-fetch';

import PatternLoader from './pattern-loader';
import getPatternContent from './util/get-pattern-content';
// import getFolder from './util/get-folder';
// import urlQuery from '../../utils/url-query';

@pure
@autobind
class PatternSection extends React.Component {
	displayName = 'PatternSection';
	state = {
		data: null,
		error: false,
		type: null
	};

	static propTypes = {
		id: types.string.isRequired,
		data: types.object,
		config: types.object.isRequired,
		environment: types.string.isRequired,
		location: types.object.isRequired,
		onDataRequest: types.func.isRequired,
		type: types.string.isRequired
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

	render() {
		const {location, type, data = {}} = this.props;
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

		const content = loading ?
			<PatternLoader key="pattern-loader" inverted={theme === 'dark'}/> :
			getPatternContent(type, data, this.props);

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
					{content}
				</CSSTransitionGroup>
			</section>
		);
	}
}

export default PatternSection;
