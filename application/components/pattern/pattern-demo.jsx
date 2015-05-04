import React from 'react';
import {findDOMNode} from 'react';

import Frame from '../common/frame.jsx'

class PatternDemo extends React.Component {
	static displayName = 'PatternDemo';

	static defaultProps = {
		'base': '/demo'
	};

	render () {
		let source = `${this.props.base}/${this.props.target}`;
		let id = `${source}-demo`;

		return (
			<div className="pattern-demo-container">
				<Frame className="pattern-demo" src={source} id={source} />
			</div>
		);
	}
}

export default PatternDemo;
