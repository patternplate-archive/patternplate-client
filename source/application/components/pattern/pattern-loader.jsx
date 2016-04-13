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
		error: types.bool.isRequired,
		hidden: types.bool
	};

	state = {
		isHidden: true
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.hidden && !this.props.hidden && !this.state.isHidden) {
			setTimeout(() => {
				this.setState({
					isHidden: true
				});
			}, 300);
		} else if (!nextProps.hidden) {
			this.setState({
				isHidden: false
			});
		}
	}

	render() {
		const className = classnames('pattern-loader', {
			'pattern-error': this.props.error,
			'pattern-loader--hidden': this.props.hidden,
			'pattern-loader--is-hidden': this.state.isHidden
		});

		return (
			<div className={className}>
				<div className="pattern-loader-icon"/>
			</div>
		);
	}
}

export default PatternLoader;
