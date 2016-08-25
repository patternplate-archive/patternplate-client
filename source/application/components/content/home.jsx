import React, {Component, PropTypes as t} from 'react';
import Markdown from '../common/markdown';

// import Messages from './messages';
// import pure from 'pure-render-decorator';

class Home extends Component {
	static propTypes = {
		readme: t.string.isRequired,
		base: t.string.isRequired
	};

	render() {
		const {readme, base} = this.props;
		return (
			<main className="application__content content home">
				<Markdown source={readme} base={base}/>
			</main>
		);
	}
}

export default Home;
