import React from 'react';
import {PropTypes, findDOMNode} from 'react';
import highlight from 'highlight.js';
import {pd as pretty} from 'pretty-data';

import Headline from '../common/headline.jsx';

class PatternCode extends React.Component {
	displayName = 'PatternCode';

	static defaultProps = {
		'format': 'html',
	};

	static propTypes = {
		'children': PropTypes.string.isRequired,
		'format': PropTypes.string,
		'name': PropTypes.string.isRequired
	};

	static highlight(component, selector = 'pre > code') {
		for (let node of findDOMNode(component).querySelectorAll(selector)) {
			highlight.highlightBlock(node);
		}
	}

	static pretty(component) {
		if (component.props.format !== 'html') {
			return component.props.children;
		}
		return pretty.xml(component.props.children);
	}

	componentDidMount() {
		PatternCode.highlight(this);
	}

	componentDidUpdate() {
		PatternCode.highlight(this);
	}

	render () {
		return (
			<div className="pattern-code">
				<Headline order={3}>{this.props.name}</Headline>
				<pre className="pattern-code">
					<code className={this.props.format}>
						{PatternCode.pretty(this)}
					</code>
				</pre>
			</div>
		);
	}
}

export default PatternCode;
