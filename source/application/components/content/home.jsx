import React, {Component, PropTypes as t} from 'react';
import Markdown from '../common/markdown';

// import Messages from './messages';
// import pure from 'pure-render-decorator';

class Home extends Component {
	static propTypes = {
		readme: t.string.isRequired
	};

	render() {
		return (
			<main className="content home">
				Hello?
				<Markdown source={this.props.readme}/>
			</main>
		);
	}
}

/* @pure
class Home extends React.Component {
	static propTypes = {
		eventEmitter: t.instanceOf(EventEmitter),
		messages: t.array.isRequired,
		schema: t.shape({
			readme: t.string.isRequired
		})
	};

	static defaultProps = {
		messages: [],
		schema: {
			readme: ''
		}
	};

	render() {
		console.log(this.props);
		return (
			<main>
				Hello!
			</main>
			/* <main className="content home">
				<div
					className="markdown"
					dangerouslySetInnerHTML={{
						__html: this.props.schema.readme
					}}
					/>
				<Messages
					eventEmitter={this.props.eventEmitter}
					messages={this.props.messages}
					/>
			</main>
		);
	}
} */

export default Home;
