import React, {PropTypes as types} from 'react';
import classnames from 'classnames';
import pure from 'pure-render-decorator';

@pure
class PatternLoader extends React.Component {
	displayName = 'PatternLoader';

	static defaultProps = {
		error: false
	};

	static propTypes = {
		error: types.bool.isRequired
	};

	render() {
		const className = classnames('pattern-loader', {
			'pattern-error': this.props.error
		});

		return (
			<div className={className}>
				<img
					width="120"
					height="120"
					src="/static/images/patternplate-logo-animated.svg"
					/>
			</div>
		);
	}
}

export default PatternLoader;
