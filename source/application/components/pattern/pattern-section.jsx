import React, {PropTypes as t} from 'react';
import pure from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import {pick, isEqual} from 'lodash';

import 'isomorphic-fetch';

// import PatternLoader from './pattern-loader';
import PatternContainer from '../../containers/pattern';

@pure
@autobind
class PatternSection extends React.Component {
	static propTypes = {
		base: t.string.isRequired,
		environment: t.string.isRequired,
		id: t.string.isRequired,
		location: t.object.isRequired,
		onDataRequest: t.func.isRequired
	};

	static defaultProps = {
		environment: 'index',
		onDataRequest: () => {}
	};

	componentDidMount() {
		const {id, base, environment} = this.props;
		this.props.onDataRequest(id, {environment}, {loading: true, base});
	}

	componentWillReceiveProps(nextProps) {
		const next = pick(nextProps, ['id', 'environment']);
		const current = pick(this.props, ['id', 'environment']);
		const query = {environment: next.environment};
		const options = {loading: next.id !== current.id, base: nextProps.base};
		if (nextProps.type === 'pattern' && !isEqual(next, current)) {
			this.props.onDataRequest(next.id, query, options);
		}
	}

	handleDataRequest(id, query, options) {
		this.props.onDataRequest(id, query, options);
	}

	render() {
		/* const {props} = this;
		const {base, location, data, config} = props;
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
		}); */

		return (
			<section className="pattern-section">
				<PatternContainer
					location={this.props.location}
					/>
			</section>
		);
	}
}

export default PatternSection;
