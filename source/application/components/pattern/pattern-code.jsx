import React, {PropTypes as types} from 'react';
import {findDOMNode} from 'react-dom';

import autobind from 'autobind-decorator';
import cx from 'classnames';
import {memoize} from 'lodash';
import pure from 'pure-render-decorator';
import uuid from 'uuid';

const startWorker = memoize(url => {
	const {Worker} = global;
	return new Worker(url);
});

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
		children: types.node.isRequired,
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
			const {children: payload} = this.props;
			const id = uuid.v4();
			const worker = startWorker('/script/highlight.bundle.js');
			worker.addEventListener('message', this.onWorkerMessage);
			worker.postMessage(JSON.stringify({id, payload}));
			this.worker = worker;
			this.id = id;
		}
	}

	componentWillUnmount() {
		if (this.worker) {
			this.worker.removeEventListener('message', this.onWorkerMessage);
		}
	}

	@autobind
	onWorkerMessage(e) {
		const {data} = e;
		const {payload: code, id} = JSON.parse(data);
		if (id === this.id) {
			this.setState({code});
		}
	}

	componentWillUpdate(nextProps) {
		const {children} = this.props;
		if (this.worker && nextProps.children !== children) {
			this.worker.postMessage(JSON.stringify({
				id: this.id,
				payload: nextProps.children
			}));
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
								dangerouslySetInnerHTML={{__html: code}} // eslint-disable-line react/no-danger
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
