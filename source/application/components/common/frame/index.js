import React, {Component, PropTypes as types} from 'react';
import autobind from 'autobind-decorator';
import pure from 'pure-render-decorator';

import bind from './bind';
import relay from './relay';

@pure
@autobind
export default class Frame extends Component {
	static displayName = 'Frame';

	static propTypes = {
		src: types.string.isRequired,
		id: types.string.isRequired
	};

	componentDidMount() {
		bind(this.ref, this.props);
	}

	saveRef(ref) {
		this.ref = ref;
	}

	render() {
		const {props} = this;

		const onLoad = e => {
			bind(this.ref, this.props);
			props.onLoad(e);
		};

		return (
			<iframe
				className={props.className}
				onLoad={relay(onLoad, props.onError)}
				ref={this.saveRef}
				src={props.src}
				sandbox={props.sandbox}
				onKeyDown={this.handleKeyDown}
				/>
		);
	}
}
