import React from 'react';
import {findDOMNode} from 'react';

import elastic from 'elasticframe';

class PatternDemo extends React.Component {
	static displayName = 'PatternDemo';

	static defaultProps = {
		'base': '/demo'
	};

	static elastify(component) {
		let componentNode = findDOMNode(component);
		let source = `${component.props.base}/${component.props.target}`;
		let id = source.replace(/\//g, '-');

		let elasticNode = componentNode.querySelector(`#${id}`);

		if (! elasticNode) {
			return;
		}

		elastic.initParent(id);
	}

	componentDidMount() {
		PatternDemo.elastify(this);
	}

	componentDidUpdate() {
		PatternDemo.elastify(this);
	}

	componentWillUnmount() {
		window.removeEventListener('resize');
		window.removeEventListener('message');
	}

	render () {
		let source = `${this.props.base}/${this.props.target}`;
		let id = source.replace(/\//g, '-');

		return (
			<div className="pattern-demo-container">
				<iframe className="pattern-demo" src={source} id={id} />
			</div>
		);
	}
}

export default PatternDemo;
