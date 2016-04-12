import React from 'react';
import {PropTypes} from 'react';
import classnames from 'classnames';
import pure from 'pure-render-decorator';

import Icon from '../common/icon';

@pure
class PatternLoader extends React.Component {
	displayName = 'PatternLoader';

	static defaultProps = {
		'error': false
	};

	static propTypes = {
		'error': PropTypes.bool.isRequired
	};

	render () {
		let className = classnames('pattern-loader', {
			'pattern-error': this.props.error
		});

		let symbol = this.props.error ?  'patternplate' : 'patternplate-loading';

		return (
			<div className={className}>
				<Icon inline={true} symbol={symbol}>Loading ...</Icon>
			</div>
		);
	}
}

export default PatternLoader;
