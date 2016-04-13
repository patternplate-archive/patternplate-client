import React, {PropTypes} from 'react';
import pure from 'pure-render-decorator';

@pure
class PatternDocumentation extends React.Component {
	displayName = 'PatternDocumentation';

	static propTypes = {
		children: PropTypes.string.isRequired
	};

	render() {
		return (
			<div className="pattern-documentation">
				<div
					className="markdown"
					dangerouslySetInnerHTML={{__html: this.props.children}} // eslint-disable-line react/no-danger
					/>
			</div>
		);
	}
}

export default PatternDocumentation;
