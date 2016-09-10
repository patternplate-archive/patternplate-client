import React, {Component, PropTypes as t} from 'react';
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
		state: t.string.isRequired,
		theme: t.oneOf(['dark', 'light']).isRequired
	};

	state = {
		value: ''
	};

	handleChange(e) {
		this.setState({value: e.target.value});
	}

	handleApplyState() {
		if (this.state.value && this.state.value !== this.props.state) {
			try {
				const data = JSON.parse(this.state.value);
				this.props.onApplyState(data);
			} catch (error) {
				console.error(error);
			}
		}
	}

	render() {
		const {props} = this;

		return (
			<Lightbox
				title="Modify state"
				backdrop
				>
				<Markdown
					base={props.base}
					className="problem-lightbox__instructions"
					source="> :rocket: Edit `patternplate-client` redux state directly"
					/>
				<div className="console-lightbox__preview">
					<Editor
						className="editor console-lightbox__state"
						value={this.state.value || props.state}
						onChange={this.handleChange}
						/>
				</div>
				<div className="console-lightbox__button-row">
					<button
						className="button console-lightbox__button console-lightbox__button--apply"
						onClick={this.handleApplyState}
						>
						Apply changes
					</button>
					<Link
						to={{
							...props.location,
							query: {
								...props.location.query,
								lightbox: false
							}
						}}
						title="Close this lightbox [esc]"
						className="button console-lightbox__button console-lightbox__button--abort"
						>
						Close
					</Link>
				</div>
			</Lightbox>
		);
	}
}
