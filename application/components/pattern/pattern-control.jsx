import React from 'react';
import classnames from 'classnames';

class PatternControl extends React.Component {
	displayName = 'PatternControl';

	render () {
		let className = classnames('pattern-control', {
			'active': this.props.active
		});

		return (
			<label className={className} htmlFor={this.props.target}>
				{this.props.name}
			</label>
		);
	}
}

export default PatternControl;
