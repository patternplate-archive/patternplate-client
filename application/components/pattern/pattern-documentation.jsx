import React from 'react';
import {PropTypes} from 'react';
import Headline from '../common/headline.jsx';

class PatternDocumentation extends React.Component {
	displayName = 'PatternDocumentation';

	static propTypes = {
		'children': PropTypes.string.isRequired
	};

	render () {
		return (
			<div className="pattern-documentation">
				<Headline order={3}>{this.props.name}</Headline>
				<div className="markdown" dangerouslySetInnerHTML={{'__html': this.props.children}}></div>
			</div>
		);
	}
}

export default PatternDocumentation;
