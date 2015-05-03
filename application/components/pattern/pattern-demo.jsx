import React from 'react';
import elastic from 'elasticframe';

class PatternDemo extends React.Component {
	static displayName = 'PatternDemo';

	static defaultProps = {
		'base': '/demo'
	};

	componentDidMount() {
		try{
			elastic.initParent(`${this.props.base}/${this.props.target}`);
		} catch (err) {
			return;
		}
	}

	render () {
		let source = `${this.props.base}/${this.props.target}`;

		return (
			<div className="pattern-demo-container">
				<iframe className="pattern-demo" src={source} id={source} />
			</div>
		);
	}
}

export default PatternDemo;
