import React from 'react';
import {PropTypes, findDOMNode} from 'react';
import highlight from 'highlight.js';

import Headline from '../common/headline.jsx';

class PatternDocumentation extends React.Component {
	displayName = 'PatternDocumentation';

	static propTypes = {
		'children': PropTypes.string.isRequired
	};

	static highlight(component, selector = 'pre > code') {
		for (let node of findDOMNode(component).querySelectorAll(selector)) {
			highlight.highlightBlock(node);
		}
	}

	componentDidMount() {
		PatternDocumentation.highlight(this);
	}

	componentDidUpdate() {
		PatternDocumentation.highlight(this);
	}

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
