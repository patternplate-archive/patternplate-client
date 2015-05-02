import React from 'react';
import {PropTypes, findDOMNode} from 'react';
import highlight from 'highlight.js';

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

	static highlight(component) {
		let node = findDOMNode(component).querySelector('code');
		highlight.highlightBlock(node);
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
						{this.props.children}
					</code>
				</pre>
			</div>
		);
	}
}

export default PatternCode;
