import path from 'path';
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
		extname: types.string.isRequired,
		format: types.string.isRequired,
		highlight: types.bool,
		highlights: types.object.isRequired,
		id: types.string,
		name: types.string.isRequired,
		onConcernChange: types.func.isRequired,
		onTypeChange: types.func.isRequired,
		source: types.string.isRequired,
		type: types.string.isRequired,
		types: types.arrayOf(types.string).isRequired
	};

	static defaultProps = {
		// format: 'html',
		highlight: true,
		copy: true
	};

	state = {
		copying: false
	};

	componentDidMount() {
		const {base, format: language, dispatch, highlight, highlights, id, source} = this.props;
		if ((this.props.highlights.errors || []).includes(id)) {
			return;
		}
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
		if ((next.highlights.errors || []).includes(id)) {
			return;
		}
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
		const {props} = this;

		const prettify = props.highlight && props.format === 'html';
		const prettified = prettify ? pretty.xml(props.source) : props.source;
		const highlighted = props.highlights[props.id];
		const children = highlighted ? toElements(highlighted) : prettified;
		const {copying} = this.state;
		const formatClassName = join(`hljs`, props.format);

		const concern = {
			value: props.concern,
			name: `${props.concern}${props.extname}`
		};

		const concerns = this.props.concerns.map(concern => {
			return {name: `${concern}${props.extname}`, value: concern};
		});

		const type = {
			value: this.props.type,
			name: this.props.type
		};

		const types = this.props.types.map(type => {
			return {name: type, value: type};
		});

		return (
			<div className="pattern-code">
				<div className="pattern-code__toolbar">
					<div className="pattern-code__name">
						<Select
							base={props.base}
							className="pattern-code__concern"
							options={concerns}
							onChange={props.onConcernChange}
							value={concern}
							/>
						<Select
							base={props.base}
							className="pattern-code__type"
							options={types}
							onChange={props.onTypeChange}
							value={type}
							/>
					</div>
					<div className="pattern-code__tools">
						{
							props.copy &&
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
