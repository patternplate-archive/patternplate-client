import React, {Component, PropTypes as types} from 'react';
import pure from 'pure-render-decorator';

@pure
class Frame extends Component {
	static displayName = 'Frame';

	static propTypes = {
		src: types.string.isRequired,
		id: types.string.isRequired
	};

	render() {
		const {id, ...props} = this.props;

		return (
			<iframe
				{...props}
				key={id}
				/>
		);
	}
}

export default Frame;
