import React from 'react';

class PatternControl extends React.Component {
	displayName = 'PatternControl';

	render () {
		return (
			<label className="pattern-control" htmlFor={this.props.target}>
				{this.props.name}
			</label>
		);
	}
}

export default PatternControl;
