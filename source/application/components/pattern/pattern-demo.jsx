import React, {PropTypes as types} from 'react';

import Frame from '../common/frame';

class PatternDemo extends React.Component {
	static displayName = 'PatternDemo';

	static propTypes = {
		base: types.string,
		target: types.string
	};

	static defaultProps = {
		base: '/demo'
	};

	render() {
		const source = `${this.props.base}/${this.props.target}`;

		return (
			<div className="pattern-demo-container">
				<Frame
					className="pattern-demo"
					src={source}
					id={source}
					sandbox="allow-same-origin allow-scripts allow-forms allow-scripts"
					/>
			</div>
		);
	}
}

export default PatternDemo;
