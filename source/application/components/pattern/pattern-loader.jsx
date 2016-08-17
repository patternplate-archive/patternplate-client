import React, {PropTypes as types} from 'react';
import classnames from 'classnames';
import pure from 'pure-render-decorator';

import PatternLoaderIcon from './pattern-loader-icon';

@pure
class PatternLoader extends React.Component {
	displayName = 'PatternLoader';

	static defaultProps = {
		error: false
	};

	static propTypes = {
		error: types.bool.isRequired,
		inverted: types.bool,
		hidden: types.bool
	};

	render() {
		const className = classnames('pattern-loader', {
			'pattern-error': this.props.error,
			'pattern-loader--hidden': this.props.hidden
		});

		return (
			<div className={className}>
				<PatternLoaderIcon
					width={200}
					height={200}
					inverted={this.props.inverted}
					/>
			</div>
		);
	}
}

export default PatternLoader;
