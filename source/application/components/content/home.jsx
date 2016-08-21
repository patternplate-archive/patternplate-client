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
				<Markdown source={this.props.readme}/>
			</main>
		);
	}
}

export default Home;
