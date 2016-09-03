import React, {PropTypes as types} from 'react';
import {pd as pretty} from 'pretty-data';
import autobind from 'autobind-decorator';
import pure from 'pure-render-decorator';
import {requestIdleCallback, cancelIdleCallback} from 'request-idle-callback';

import Select from '../common/select';
import toElements from '../../utils/to-elements';

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
		highlight: types.bool,
		highlights: types.object.isRequired,
		id: types.string,
		name: types.string.isRequired,
		onConcernChange: types.func.isRequired,
		onHighlightRequest: types.func.isRequired,
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

	componentDidMount() {
		const {props} = this;
		this.idle = requestIdleCallback(() => {
			highlightIfNeeded(props);
		}, 50000);
	}

	componentWillUpdate(props) {
		this.idle = requestIdleCallback(() => {
			highlightIfNeeded(props);
		}, 5000);
	}

	componentWillUnmount() {
		if (this.timeout) {
			global.clearTimeout(this.timeout);
		}
		if (this.idle) {
			cancelIdleCallback(this.idle);
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
		const highlighted = props.highlights.results.find(result => props.id === result.id);

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
						<code className={`hljs hljs--raw ${props.format}`}>
							{prettified}
						</code>
						{
							highlighted &&
								<code
									className={`hljs hljs--highlighted ${props.format}`}
									key="highlighted"
									>
									{toElements(highlighted.payload)}
								</code>
						}
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

function highlightIfNeeded(props) {
	if (!props.source) {
		return;
	}
	if (!props.format) {
		return;
	}

	const waits = ['errors', 'queue']
		.some(key => props.highlights[key].find(item => item.id === props.id));

	if (waits) {
		return;
	}

	const result = props.highlights.results.find(item => item.id === props.id);

	if (result) {
		return;
	}

	const worker = `${props.base}script/lowlight.bundle.js`;
	const options = {id: props.id, payload: props.source, worker, language: props.format};
	props.onHighlightRequest(options);
}
