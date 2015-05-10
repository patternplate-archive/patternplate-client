import React from 'react';
import {PropTypes, findDOMNode} from 'react';
import highlight from 'highlight.js';
import {pd as pretty} from 'pretty-data';

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

	static clipboard(component) {
		let el = findDOMNode(component).querySelector('.clipboard');
		el.focus();
		el.select();

		let result = document.execCommand('copy');
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

	onCopyClick(e) {
		PatternCode.clipboard(this);
	}

	render () {
		let pretty = PatternCode.pretty(this);

		return (
			<div className="pattern-code">
				<div className="pattern-code-toolbar">
					<div className="pattern-code-name">{this.props.name}</div>
					<div className="pattern-code-tools">
						<button type="button" onClick={(e) => this.onCopyClick(e)}>Copy</button>
					</div>
				</div>
				<pre>
					<code className={this.props.format}>
						{pretty}
					</code>
				</pre>
				<textarea className="clipboard" value={pretty} readOnly={true} />
			</div>
		);
	}
}

export default PatternCode;
