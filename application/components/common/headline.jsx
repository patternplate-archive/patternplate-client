import React from 'react';
import classnames from 'classnames';
import {PropTypes,DOM} from 'react';

class Headline extends React.Component {
	displayName = 'Headline';

	static defaultProps = {
		'children': 'Headline',
		'order': 1
	};

	static propTypes = {
		'children': PropTypes.string.isRequired,
		'order': PropTypes.oneOf[1, 2, 3, 4, 5, 6],
		'display': PropTypes.oneOf[1, 2, 3, 4, 5, 6]
	};

	render () {
		let TagName = `h${this.props.order}`;
		let className = classnames('h', `h${this.props.display || this.props.order}`, this.props.className);

		return (
			<TagName className={className}>
				{this.props.children}
			</TagName>
		);
	}
}

export default Headline;
