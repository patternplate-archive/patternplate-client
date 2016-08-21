import React, {PropTypes as types} from 'react';

import autobind from 'autobind-decorator';
import cx from 'classnames';
import {memoize} from 'lodash';
import pure from 'pure-render-decorator';
import uuid from 'uuid';

const startWorker = memoize(url => {
	const {Worker} = global;
	return new Worker(url);
});

@pure
@autobind
class PatternCode extends React.Component {
	displayName = 'PatternCode';

	static propTypes = {
		base: types.string.isRequired,
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
		code: '',
		copying: false
	};

	componentDidMount() {
		if (this.props.highlight) {
			const {children: payload, base} = this.props;
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

	saveReference(ref) {
		this.ref = ref;
	}

	handleCopyClick() {
		if (this.ref) {
			this.ref.focus();
			this.ref.select();
			global.document.execCommand('copy');
			this.setState({
				...this.state,
				copying: true
			});
			setTimeout(() => {
				this.setState({
					...this.state,
					copying: false
				});
			}, 3000);
		}
	}

	render() {
		const {
			format,
			name,
			copy,
			highlight,
			children
		} = this.props;

		const {code, copying} = this.state;

		const formatClassName = cx(`hljs`, format);

		return (
			<div className="pattern-code">
				<div className="pattern-code-toolbar">
					<div className="pattern-code-name">{name}</div>
					<div className="pattern-code-tools">
						{
							copy &&
								<button type="button" onClick={this.handleCopyClick}>
									{copying ? 'Copied!' : 'Copy to clipboard'}
								</button>
						}
					</div>
				</div>
				<div className="pattern-code-content">
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
					<textarea
						className="clipboard"
						value={children}
						ref={this.saveReference}
						readOnly
						/>
				</div>
			</div>
		);
	}
}

export default PatternCode;
