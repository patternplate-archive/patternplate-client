import React, {PropTypes as types} from 'react';
import {findDOMNode} from 'react-dom';

import cx from 'classnames';
import pure from 'pure-render-decorator';

function clipboard(component) {
	const el = findDOMNode(component).querySelector('.clipboard');
	el.focus();
	el.select();
	global.document.execCommand('copy');
}

@pure
class PatternCode extends React.Component {
	displayName = 'PatternCode';

	static propTypes = {
		children: types.string.isRequired,
		format: types.string,
		name: types.string.isRequired,
		copy: types.bool,
		highlight: types.bool
	};

	static defaultProps = {
		format: 'html',
		highlight: true,
		copy: true
	};

	state = {
		code: ''
	};

	componentDidMount() {
		if (this.props.highlight) {
			const {Worker} = global;
			this.worker = new Worker('/script/highlight.bundle.js');

			this.worker.onmessage = e => {
				this.setState({
					code: e.data
				});
			};

			this.worker.postMessage(this.props.children);
		}
	}

	componentWillUnmount() {
		if (this.worker) {
			this.worker.terminate();
		}
	}

	componentWillUpdate(nextProps) {
		const {children} = this.props;
		if (this.worker && nextProps.children !== children) {
			this.worker.postMessage(nextProps.children);
		}
	}

	handleCopyClick() {
		clipboard(this);
	}

	render() {
		const {
			format,
			name,
			copy,
			highlight,
			children
		} = this.props;

		const {
			code
		} = this.state;

		const formatClassName = cx(`hljs`, format);

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
					{
						highlight ?
							<code
								className={formatClassName}
								dangerouslySetInnerHTML={{__html: code}}
								/> :
							<code className="hljs">
								{children}
							</code>
					}
				</pre>
				<textarea className="clipboard" value={code} readOnly/>
			</div>
		);
	}
}

export default PatternCode;
