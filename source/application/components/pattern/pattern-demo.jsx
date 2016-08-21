import React, {PropTypes as types} from 'react';
import pure from 'pure-render-decorator';
import urlQuery from '../../utils/url-query';
import Frame from '../common/frame';

@pure
class PatternDemo extends React.Component {
	static displayName = 'PatternDemo';

	static propTypes = {
		base: types.string,
		target: types.string,
		environment: types.string
	};

	render() {
		const {base, target, environment} = this.props;
		const source = urlQuery.format({
			pathname: `${base}demo/${target}/index.html`,
			query: {environment}
		});

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
