import React, {PropTypes as t} from 'react';
import Markdown from '../containers/markdown';
import Search from '../containers/search';

export default Documentation;

function Documentation(props) {
	return (
		<div className="application-container application-container--home">
			{
				props.withSearch &&
					<Search/>
			}
			<Markdown
				source={props.doc.contents}
				base={props.base}
				className="home"
				/>
		</div>
	);
}

Documentation.propTypes = {
	base: t.string.isRequired,
	id: t.string.isRequired,
	doc: t.shape({
		contents: t.string.isRequired
	}).isRequired,
	withSearch: t.boolean
};

/* import React, {Component, PropTypes as t} from 'react';
import Markdown from '../../containers/markdown';
import Search from '../../containers/search';

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
			<div className="application-container application-container--home">
				<Search inline/>
				<Markdown source={readme} base={base} className="home"/>
			</div>
		);
	}
}

export default Home; */
