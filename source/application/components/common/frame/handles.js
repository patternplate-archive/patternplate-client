import autobind from 'autobind-decorator';
import React, {Component} from 'react';
import Handle from './handle';

@autobind
export default class Handles extends Component {
	render() {
		const {props} = this;

		return (
			<div className="frame__handles">
				<Handle
					className="frame-handle frame-handle--horizontal"
					onClear={props.onClearHorizontal}
					onDrag={props.onDragHorizontal}
					onSubmit={props.onSubmitHorizontal}
					pathname={props.pathname}
					query={props.query}
					value={props.heightValue}
					width={props.width}
					/>
				<Handle
					className="frame-handle frame-handle--vertical"
					height={props.height}
					onClear={props.onClearVertical}
					onDrag={props.onDragVertical}
					onSubmit={props.onSubmitVertical}
					pathname={props.pathname}
					query={props.query}
					value={props.widthValue}
					/>
				<Handle
					className="frame-handle frame-handle--diagonal"
					onDrag={props.onDragDiagonal}
					/>
			</div>
		);
	}
}
