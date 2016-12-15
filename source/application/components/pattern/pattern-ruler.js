import autobind from 'autobind-decorator';
import {find, range} from 'lodash';
import pure from 'pure-render-decorator';
import React, {Component, PropTypes as t} from 'react';

const start = {transform: 'translate3d(0, 0, 0)'};

@autobind
export default class Ruler extends Component {
	componentDidMount() {
		const end = this.props.type === 'horizontal' ?
			{transform: 'translate3d(-100%, 0, 0)'} :
			{transform: 'translate3d(0, -100%, 0)'};

		const keyframes = [start, end];
		const options = {duration: 100};
		this.animation = this.ref.animate(keyframes, options);
		this.animation.pause();
		this.animation.currentTime = this.props.offset;
		global.a = this.animation;
	}

	componentDidUpdate() {
		this.animation.currentTime = this.props.offset;
	}

	saveRef(ref) {
		this.ref = ref;
	}

	render() {
		const {props} = this;
		const type = props.type === 'horizontal' ? 'horizontal' : 'vertical';
		const markerPositionProperty = props.type === 'horizontal' ? 'left' : 'top';

		return (
			<div className={`pattern-ruler pattern-ruler--${type}`}>
				<div className="pattern-ruler__scale" ref={this.saveRef}>
					<RulerSteps type={props.type} length={props.length} step={props.step}/>
				</div>
				{
					props.markers.map(marker => {
						const style = {[markerPositionProperty]: `${marker}px`};
						return <div className="pattern-ruler__marker" key={marker} style={style}/>;
					})
				}
			</div>
		);
	}
}

Ruler.propTypes = {
	length: t.number.isRequired,
	markers: t.arrayOf(t.number).isRequired,
	offset: t.number.isRequired,
	step: t.number.isRequired,
	type: t.string.isRequired
};

Ruler.defaultProps = {
	length: 0
};

@pure
class RulerSteps extends Component {
	render() {
		const {props} = this;
		const steps = getSteps(props.length, props.step);
		const spacerProperty = props.type === 'horizontal' ? 'marginLeft' : 'marginTop';
		const orderProperty = props.type === 'horizontal' ? 'height' : 'width';
		const sizingProperty = props.type === 'horizontal' ? 'width' : 'height';

		return (
			<ul className="pattern-ruler__steps">
				{steps.map((step, index) => {
					const orderDimension = ['15px', '10px', '5px'][step.order - 1];
					const spacer = index > 0 ? props.step - 1 : 0;

					return (
						<li
							key={index}
							className={`pattern-ruler__step pattern-ruler__step--${step.order}`}
							style={{
								[spacerProperty]: `${spacer}px`,
								[sizingProperty]: '1px',
								[orderProperty]: orderDimension
							}}
							>
							{
								typeof step.label !== 'undefined' &&
									<span className="pattern-ruler__label">
										{step.label}
									</span>
							}
						</li>
					);
				})}
			</ul>
		);
	}
}

RulerSteps.propTypes = {
	length: t.number.isRequired,
	step: t.number.isRequired,
	type: t.string.isRequired
};

function getSteps(length, step) {
	return range(Math.round(length / step))
		.map((_, index) => index)
		.map(count => {
			const label = count % 10 === 0 ? count * step : null;
			const matches = [10, 5];
			const match = find(matches, n => count % n === 0);
			const order = match ? matches.indexOf(match) + 1 : 3;
			return {label, order};
		});
}
