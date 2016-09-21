import autobind from 'autobind-decorator';
import join from 'classnames';
import {noop} from 'lodash';
import queryString from 'query-string';
import React, {Component, PropTypes as t} from 'react';

@autobind
export default class Handle extends Component {
	static propTypes = {
		className: t.string,
		onClear: t.func.isRequired,
		onDrag: t.func.isRequired,
		onSubmit: t.func.isRequired,
		pathname: t.string,
		query: t.object,
		value: t.string
	}

	static defaultProps = {
		onSubmit: noop,
		onClear: noop,
		onDrag: noop
	};

	state = {
		active: false
	};

	componentDidMount() {
		global.addEventListener('mousemove', this.handleGlobalMouseMove);
		global.addEventListener('mouseup', this.handleGlobalMouseUp);
	}

	componentWillUnmount() {
		global.removeEventListener('mousemove', this.handleGlobalMouseMove);
		global.removeEventListener('mouseup', this.handleGlobalMouseUp);
	}

	handleMouseDown(e) {
		e.preventDefault();
		this.setState({active: true});
	}

	handleGlobalMouseMove(e) {
		e.preventDefault();
		if (this.state.active) {
			this.props.onDrag(e);
		}
	}

	handleGlobalMouseUp() {
		if (this.state.active) {
			this.setState({active: false});
		}
	}

	render() {
		const {props} = this;
		const style = {width: props.width, height: props.height};

		const target = props.value ?
			`${props.pathname}?${queryString.stringify(props.query)}` : ``;

		const className = join('handle', props.className, {
			'handle--active': this.state.active
		});

		return (
			<div className={className} style={style}>
				<div
					className="handle__interaction"
					onMouseDown={this.handleMouseDown}
					>
					{
						this.state.active &&
							<div className="handle__capture"/>
					}
				</div>
				{/*
					('value' in this.props) &&
						<form
							className="handle__value"
							method="get"
							target={target}
							onSubmit={this.props.onSubmit}
							>
							<input
								className="handle__input"
								value={this.props.value}
								/>
							<button
								type="reset"
								className="handle__clear"
								onClick={this.props.onClear}
								>
								Clear
							</button>
						</form>
				*/}
			</div>
		);
	}
}
