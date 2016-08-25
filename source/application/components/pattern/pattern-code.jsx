import React, {PropTypes as types} from 'react';
import {connect} from 'react-redux';
import join from 'classnames';
import {pd as pretty} from 'pretty-data';
import toh from 'hast-to-hyperscript';

import autobind from 'autobind-decorator';
import pure from 'pure-render-decorator';

import highlightCode from '../../actions/highlight-code';

@pure
@autobind
class PatternCode extends React.Component {
	displayName = 'PatternCode';

	static propTypes = {
		base: types.string.isRequired,
		copy: types.bool,
		dispatch: types.func.isRequired,
		format: types.string.isRequired,
		highlight: types.bool,
		highlights: types.object.isRequired,
		id: types.string,
		name: types.string.isRequired
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
			const {base, format: language, dispatch, id, source} = this.props;
			const worker = `${base}script/lowlight.bundle.js`;
			const options = {id, payload: source, worker, language};
			dispatch(highlightCode(options));
		}
	}

	componentWillUnmount() {
		if (this.timeout) {
			global.clearTimeout(this.timeout);
		}
	}

	saveReference(ref) {
		this.ref = ref;
	}

	handleCopyClick() {
		if (this.ref && !this.state.copying) {
			this.ref.focus();
			this.ref.select();
			global.document.execCommand('copy');
			this.setState({
				...this.state,
				copying: true
			});
			this.timeout = setTimeout(() => {
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
			concern,
			copy,
			highlight,
			highlights,
			source: passed,
			type
		} = this.props;

		const prettify = highlight && format === 'html';
		const prettified = prettify ? pretty.xml(passed) : passed;
		const highlighted = highlights[id];
		const children = highlighted ? toh(React.createElement, highlighted) : prettified;
		const {copying} = this.state;
		const formatClassName = join(`hljs`, format);

		return (
			<div className="pattern-code">
				<div className="pattern-code__toolbar">
					<div className="pattern-code__name">
						{name}:
						<span className="pattern-code__concern"> {concern}</span>
						<span className="pattern-code__language">.{format}</span>
						<span className="pattern-code__type"> ({type})</span>
					</div>
					<div className="pattern-code__tools">
						{
							copy &&
								<button type="button" onClick={this.handleCopyClick}>
									{copying ? 'Copied!' : 'Copy to clipboard'}
								</button>
						}
					</div>
				</div>
				<div className="pattern-code__content">
					<pre>
						<code className={formatClassName}>
							{children}
						</code>
					</pre>
					<textarea
						className="clipboard"
						value={prettified}
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
