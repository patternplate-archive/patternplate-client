import React, {PropTypes as types} from 'react';

// import Messages from './messages';
import PatternSection from '../pattern/pattern-section';
import pure from 'pure-render-decorator';

import urlQuery from '../../utils/url-query';

@pure
class Content extends React.Component {
	static propTypes = {
		location: types.shape({
			pathname: types.string.isRequired
		}).isRequired,
		config: types.object.isRequired
	};

	render() {
		const {props} = this;

		const {pathname, query} = urlQuery.parse(props.location.pathname);
		const id = pathname.split('/').filter(Boolean).slice(1).join('/');
		const environment = props.environment || query.environment;

		return (
			<main className="content">
				<PatternSection
					id={id}
					data={props.patterns}
					navigation={props.navigation}
					config={props.config}
					environment={environment}
					location={props.location}
					/>
			</main>
		);
	}
}

export default Content;
