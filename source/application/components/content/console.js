import React, {Component, PropTypes as t} from 'react';
import {findDOMNode} from 'react-dom';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';

import Editor from '../common/editor';
import Markdown from '../../containers/markdown';
import Lightbox from '../lightbox';

@autobind
export default class ConsoleLightbox extends Component {
	static propTypes = {
		base: t.string.isRequired,
		onApplyState: t.func.isRequired,
		onClose: t.func.isRequired,
		state: t.string.isRequired,
		theme: t.oneOf(['dark', 'light']).isRequired,
		shortcuts: t.object.isRequired
	};

	state = {
		value: ''
	};

	componentDidMount() {
		if (this.ref) {
			const node = findDOMNode(this.ref);
			node.focus();
		}
	}

	handleApplyState() {
		if (isDisabled(this.state, this.props)) {
			return;
		}
		try {
			const data = JSON.parse(this.state.value);
			this.props.onApplyState(data);
		} catch (error) {
			console.error(error);
		}
	}

	handleChange(e) {
		this.setState({value: e.target.value});
	}

	handleClose() {
		this.props.onClose();
	}

	handleKeyDown(e) {
		if (e.ctrlKey && e.keyCode === 13) {
			e.preventDefault();
			this.handleApplyState();
		}
		if (e.keyCode === 27) {
			this.handleClose();
		}
	}

	saveRef(ref) {
		this.ref = ref;
	}

	render() {
		const {props} = this;
		const disabled = isDisabled(this.state, this.props);
		const title = disabled ?
			'No changes to apply' : 'Apply changes [ctrl+enter]';

		return (
			<Lightbox
				title="Modify state"
				backdrop
				buttons={[
					<button
						key="Apply"
						className="button console-lightbox__button console-lightbox__button--apply"
						disabled={disabled}
						title={title}
						onClick={this.handleApplyState}
						>
						Apply changes
					</button>,
					<Link
						key="Close"
						to={{
							...props.location,
							query: {
								...props.location.query,
								lightbox: false
							}
						}}
						title={`Close this lightbox ${props.shortcuts.close}`}
						className="button console-lightbox__button console-lightbox__button--abort"
						>
						Close
					</Link>
				]}
				>
				<Markdown
					base={props.base}
					className="lightbox__instructions"
					source="> :rocket: Edit `patternplate-client` redux state directly"
					/>
				<div className="console-lightbox__preview">
					<Editor
						className="editor console-lightbox__state"
						value={this.state.value || props.state}
						onChange={this.handleChange}
						onKeyDown={this.handleKeyDown}
						ref={this.saveRef}
						/>
				</div>
			</Lightbox>
		);
	}
}

function isDisabled(state, props) {
	return !state.value || state.value === props.state;
}
