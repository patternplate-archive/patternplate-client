import React, {PropTypes as types} from 'react';
import {findDOMNode} from 'react-dom';
import highlight from 'highlight.js';
import {pd as prettyData} from 'pretty-data';

class PatternCode extends React.Component {
	displayName = 'PatternCode';

	static defaultProps = {
		format: 'html',
		highlight: true,
		copy: true
	};

	static types = {
		children: types.oneOfType([
			types.string,
			types.node,
			types.element
		]).isRequired,
		format: types.string,
		name: types.string.isRequired,
		copy: types.bool,
		highlight: types.bool
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
		const {
			children,
			highlight,
			format,
			name,
			copy
		} = this.props;

		const pretty = highlight && format === 'html' ?
			prettyData.xml(children) :
			children;

		return (
			<div className="pattern-code">
				<div className="pattern-code-toolbar">
					<div className="pattern-code-name">{name}</div>
					<div className="pattern-code-tools">
						{
							copy &&
								<button type="button" onClick={this.handleCopyClick}>
									Copy
								</button>
						}
					</div>
				</div>
				<pre>
					<code className={format}>
						{pretty}
					</code>
				</pre>
				<textarea className="clipboard" value={pretty} readOnly/>
			</div>
		);
	}
}

export default PatternCode;
