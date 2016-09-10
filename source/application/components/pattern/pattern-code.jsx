import React, {PropTypes as types} from 'react';
import {pd as pretty} from 'pretty-data';
import autobind from 'autobind-decorator';
import pure from 'pure-render-decorator';

import Code from '../common/code';
import Select from '../common/select';

@pure
@autobind
export default class PatternCode extends React.Component {
	static propTypes = {
		base: types.string.isRequired,
		concern: types.string.isRequired,
		concerns: types.arrayOf(types.string).isRequired,
		copy: types.bool,
		extname: types.string.isRequired,
		format: types.string.isRequired,
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

	timeout = null;
	idle = null;

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
		const source = prettify ? pretty.xml(props.source) : props.source;
		const {copying} = this.state;

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
						<Code
							highlights={props.highlights}
							highlight={props.requestHighlight}
							language={props.format}
							>
							{source}
						</Code>
					</pre>
					<textarea
						className="clipboard"
						value={source}
						ref={this.saveReference}
						readOnly
						/>
				</div>
			</div>
		);
	}
}
