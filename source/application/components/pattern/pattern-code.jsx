import React from 'react';
import {PropTypes, findDOMNode} from 'react';
import highlight from 'highlight.js';
import {pd as prettyData} from 'pretty-data';

class PatternCode extends React.Component {
	displayName = 'PatternCode';

	static defaultProps = {
		format: 'html',
		highlight: true,
		copy: true
	};

	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
			PropTypes.element
		]).isRequired,
		format: PropTypes.string,
		name: PropTypes.string.isRequired,
		highlight: PropTypes.bool,
		copy: PropTypes.bool
	};

	static highlight(component, selector = 'pre > code') {
		for (const node of findDOMNode(component).querySelectorAll(selector)) {
			highlight.highlightBlock(node);
		}
	}

	static clipboard(component) {
		const el = findDOMNode(component).querySelector('.clipboard');
		el.focus();
		el.select();
		global.document.execCommand('copy');
	}

	componentDidMount() {
		if (this.props.highlight) {
			PatternCode.highlight(this);
		}
	}

	componentDidUpdate() {
		if (this.props.highlight) {
			PatternCode.highlight(this);
		}
	}

	onCopyClick() {
		PatternCode.clipboard(this);
	}

	render() {
		const pretty = this.props.highlight && this.props.format === 'html' ?
			prettyData.xml(this.props.children) :
			this.props.children;

		return (
			<div className="pattern-code">
				<div className="pattern-code-toolbar">
					<div className="pattern-code-name">{this.props.name}</div>
					<div className="pattern-code-tools">
						{
							this.props.copy &&
								<button type="button" onClick={(e) => this.onCopyClick(e)}>
									Copy
								</button>
						}
					</div>
				</div>
				<pre>
					<code className={this.props.format}>
						{pretty}
					</code>
				</pre>
				<textarea className="clipboard" value={pretty} readOnly />
			</div>
		);
	}
}

export default PatternCode;
