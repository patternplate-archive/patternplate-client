import React, {PropTypes as types} from 'react';
import {connect} from 'react-redux';
import join from 'classnames';
import {pd as pretty} from 'pretty-data';

import autobind from 'autobind-decorator';
import pure from 'pure-render-decorator';

import highlightCode from '../../actions/highlight-code';

@pure
@autobind
class PatternCode extends React.Component {
	displayName = 'PatternCode';

	static propTypes = {
		id: types.string,
		base: types.string.isRequired,
		children: types.node.isRequired,
		format: types.string,
		name: types.string.isRequired,
		copy: types.bool,
		dispatch: types.func.isRequired,
		highlight: types.bool,
		highlights: types.object.isRequired
	};

	static defaultProps = {
		format: 'html',
		highlight: true,
		copy: true
	};

	state = {
		copying: false
	};

	componentDidMount() {
		if (this.props.highlight) {
			const {base, dispatch, id, children: payload} = this.props;
			const worker = `${base}script/highlight.bundle.js`;
			const options = {id, payload, worker};
			dispatch(highlightCode(options));
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
			id,
			format,
			name,
			copy,
			highlight,
			highlights,
			children: passed
		} = this.props;

		const prettify = highlight && format === 'html';
		const children = prettify ? pretty.xml(passed) : passed;
		const code = highlights[id];
		const {copying} = this.state;
		const formatClassName = join(`hljs`, format);
		const highlighted = highlight && code;

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
							highlighted ?
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

export default connect(state => {
	return {highlights: state.highlights};
})(PatternCode);
