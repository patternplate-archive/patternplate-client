import autobind from 'autobind-decorator';
import join from 'classnames';
import {noop} from 'lodash';
import pure from 'pure-render-decorator';
import React, {Component, PropTypes as types} from 'react';
import {findDOMNode} from 'react-dom';

import bind from './bind';
import Handles from './handles';
import relay from './relay';

@pure
@autobind
export default class Frame extends Component {
	static displayName = 'Frame';

	static propTypes = {
		src: types.string.isRequired,
		height: types.number,
		id: types.string.isRequired,
		resizeable: types.bool.isRequired,
		resize: types.func.isRequired,
		width: types.number
	};

	static defaultProps = {
		resize: noop
	};

	handleDiagonalDrag(e) {
		const rect = findDOMNode(this.ref).getBoundingClientRect();
		this.props.resize({
			y: Math.round(e.pageY - rect.top),
			x: Math.round(e.pageX - rect.left)
		});
	}

	handleHorizontalSubmit(e) {
		this.props.resize({
			y: e.target.value
		});
	}

	handleHorizontalDrag(e) {
		const rect = findDOMNode(this.ref).getBoundingClientRect();
		this.props.resize({
			y: Math.round(e.pageY - rect.top)
		});
	}

	handleVerticalSubmit(e) {
		this.props.resize({
			x: e.target.value
		});
	}

	handleVerticalDrag(e) {
		const rect = findDOMNode(this.ref).getBoundingClientRect();
		this.props.resize({
			x: Math.round(e.pageX - rect.left)
		});
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

		const frameClassName = join(
			'iframe',
			{
				'iframe--resizeable': props.resizeable
			}
		);

		const frameResizeClassName = join(
			'frame__resize-container',
			'pattern__frame'
		);

		const style = props.resizeable ? {
			width: props.width,
			height: props.height
		} : {};

		return (
			<div className={props.className}>
				<div className={frameResizeClassName} style={style}>
					<iframe
						className={frameClassName}
						onLoad={relay(onLoad, props.onError)}
						ref={this.saveRef}
						src={props.src}
						sandbox={props.sandbox}
						onKeyDown={this.handleKeyDown}
						/>
					{
						props.resizeable &&
							<Handles
								height={props.height}
								onDragDiagonal={this.handleDiagonalDrag}
								onDragHorizontal={this.handleHorizontalDrag}
								onDragVertical={this.handleVerticalDrag}
								onSubmitHorizontal={this.handleHorizontalSubmit}
								onSubmitVertical={this.handleVerticalSubmit}
								width={props.width}
								/>
					}
				</div>
			</div>
		);
	}
}
