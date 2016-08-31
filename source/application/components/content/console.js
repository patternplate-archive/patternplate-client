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

	handleChange(value) {
		this.value = value;
	}

	handleApplyState() {
		if (this.value && this.value !== this.props.state) {
			try {
				const data = JSON.parse(this.value);
				this.props.onApplyState(data);
			} catch (error) {
				console.error(error);
			}
		}
	}

	render() {
		const {props} = this;
		const editorTheme = props.theme === 'light' ?
			'tomorrow' : 'tomorrow_night';

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
						mode="json"
						theme={editorTheme}
						className="console-lightbox__state"
						width="100%"
						height="auto"
						showPrintMargin={false}
						tabSize={2}
						value={props.state}
						editorProps={{$blockScrolling: true}}
						onChange={this.handleChange}
						wrapEnabled
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
						className="button console-lightbox__button console-lightbox__button--abort"
						>
						Close
					</Link>
				</div>
			</Lightbox>
		);
	}
}
