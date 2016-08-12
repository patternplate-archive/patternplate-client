import React, {PropTypes} from 'react';
import pure from 'pure-render-decorator';

import Markdown from '../common/markdown';

@pure
class PatternDocumentation extends React.Component {
	displayName = 'PatternDocumentation';

	static propTypes = {
		children: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	};

	render() {
		return (
			<div className="pattern-documentation">
				<div className="pattern-code-toolbar">
					<div className="pattern-code-name">{this.props.name}</div>
				</div>
				<div className="pattern-code-content">
					<Markdown source={this.props.children}/>
				</div>
			</div>
		);
	}
}

export default PatternDocumentation;
