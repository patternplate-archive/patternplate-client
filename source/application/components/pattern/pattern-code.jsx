import React, {PropTypes as types} from 'react';
import {connect} from 'react-redux';
import join from 'classnames';
import {pd as pretty} from 'pretty-data';

import autobind from 'autobind-decorator';
import pure from 'pure-render-decorator';

import Select from '../common/select';
import highlightCode from '../../actions/highlight-code';
import toElements from '../../utils/to-elements';

@pure
@autobind
class PatternCode extends React.Component {
	static propTypes = {
		base: types.string.isRequired,
		concern: types.string.isRequired,
		concerns: types.arrayOf(types.string).isRequired,
		copy: types.bool,
		dispatch: types.func.isRequired,
		format: types.string.isRequired,
		highlight: types.bool,
		highlights: types.object.isRequired,
		id: types.string,
		name: types.string.isRequired,
		onConcernChange: types.func.isRequired,
		source: types.string.isRequired,
		type: types.string.isRequired
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
		const {base, format: language, dispatch, highlight, highlights, id, source} = this.props;
		if (!highlight || highlights[id]) {
			return;
		}
		if (!source || !language) {
			return;
		}
		const worker = `${base}script/lowlight.bundle.js`;
		const options = {id, payload: source, worker, language};
		dispatch(highlightCode(options));
	}

	componentWillUpdate(next) {
		const {base, format: language, dispatch, highlight, highlights, id, source} = next;
		if (!highlight || highlights[id]) {
			return;
		}
		if (!source || !language) {
			return;
		}
		const worker = `${base}script/lowlight.bundle.js`;
		const options = {id, payload: source, worker, language};
		dispatch(highlightCode(options));
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
			base,
			copy,
			format,
			highlight,
			highlights,
			id,
			source: passed,
			onConcernChange
			// type
		} = this.props;

		const prettify = highlight && format === 'html';
		const prettified = prettify ? pretty.xml(passed) : passed;
		const highlighted = highlights[id];
		const children = highlighted ? toElements(highlighted) : prettified;
		const {copying} = this.state;
		const formatClassName = join(`hljs`, format);

		const concern = {
			value: this.props.concern,
			name: `${this.props.concern}.${format}`
		};

		const concerns = this.props.concerns.map(concern => {
			return {name: `${concern}.${format}`, value: concern};
		});

		return (
			<div className="pattern-code">
				<div className="pattern-code__toolbar">
					<div className="pattern-code__name">
						<Select
							base={base}
							className="pattern-code__concern"
							options={concerns}
							onChange={onConcernChange}
							value={concern}
							/>
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
