import React, {PropTypes as t} from 'react';
import Markdown from '../containers/markdown';

export default Documentation;

function Documentation(props) {
	return (
		<div className="application-container application-container--home">
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
	}).isRequired
};
