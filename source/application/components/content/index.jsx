import React, {PropTypes as types} from 'react';

import Messages from './messages';
import PatternSection from '../pattern/pattern-section';
import pure from 'pure-render-decorator';

@pure
class Content extends React.Component {
	static propTypes = {
		navigation: types.object,
		config: types.object,
		eventEmitter: types.object,
		messages: types.array,
		patterns: types.object,
		params: types.object,
		query: types.object
	};

	render() {
		return (
			<main className="content">
				<PatternSection
					id={this.props.params.splat}
					query={this.props.query}
					data={this.props.patterns}
					navigation={this.props.navigation}
					config={this.props.config}
					eventEmitter={this.props.eventEmitter}
					/>
				<Messages
					eventEmitter={this.props.eventEmitter}
					messages={this.props.messages}
					/>
			</main>
		);
	}
}

export default Content;
