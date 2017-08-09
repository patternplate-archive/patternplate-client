import levenshtein from 'fast-levenshtein';
import React, {PropTypes as t} from 'react';
import styled from 'styled-components';
import Markdown from '../containers/markdown';

export default class Documentation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			contents: props.doc.contents
		};
	}

	componentWillReceiveProps(next) {
		if (!next.doc.contents) {
			return;
		}

		// Kill previous setters
		if (this.timer) {
			clearTimeout(this.timer);
		}

		const distance = levenshtein.get(next.doc.contents, this.state.contents);

		if (distance < 1000) {
			this.setState({contents: next.doc.contents});
			return;
		}

		// Force the markdown container to trash for bigger changes
		// Avoids issues with reconciling whitespace in markdown
		this.setState({
			contents: ''
		});

		this.timer = setTimeout(() => this.setState({contents: next.doc.contents}));
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	render() {
		return (
			<ScrollBox>
				<StyledDocumentation>
					<Markdown source={this.state.contents}/>
				</StyledDocumentation>
			</ScrollBox>
		);
	}
}

Documentation.propTypes = {
	base: t.string.isRequired,
	doc: t.shape({
		contents: t.string.isRequired
	}).isRequired
};

const ScrollBox = styled.div`
	height: 100%;
	overflow: scroll;
	-webkit-overflow-sroll: touch;
`;

const StyledDocumentation = styled.div`
	box-sizing: border-box;
	margin: 0 auto;
	width: 100%;
	max-width: 800px;
	padding: 30px;
`;
