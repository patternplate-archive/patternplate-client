import React, {PropTypes as types} from 'react';
import pure from 'pure-render-decorator';
import {stringify} from 'querystring';

import Frame from '../common/frame';

@pure
class PatternDemo extends React.Component {
	static displayName = 'PatternDemo';

	static propTypes = {
		base: types.string,
		target: types.string,
		environment: types.string
	};

	static defaultProps = {
		base: '/demo'
	};

	render() {
		const {base, target, environment} = this.props;
		const source = `${base}/${target}/index.html?${stringify({environment})}`;

		return (
			<div className="pattern-demo-container">
				<Frame
					className="pattern-demo"
					src={source}
					id={source}
					/>
			</div>
		);
	}
}

export default PatternDemo;
