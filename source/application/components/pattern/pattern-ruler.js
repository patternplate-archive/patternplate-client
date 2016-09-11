import React from 'react';

export default Ruler;

function Ruler(props) {
	const type = props.type === 'horizontal' ? 'horizontal' : 'vertical';
	const transform = props.type === 'horizontal' ? `translate(-${props.x}px, 0)` : `translate(0, -${props.y}px)`;
	const spacerProperty = props.type === 'horizontal' ? 'marginLeft' : 'marginTop';
	const orderProperty = props.type === 'horizontal' ? 'height' : 'width';
	const sizingProperty = props.type === 'horizontal' ? 'width' : 'height';

	const steps = Array(Math.round(props.length / props.step))
		.fill(true)
		.map((_, index) => index)
		.map(count => {
			const label = count % 10 === 0 ? count * props.step : null;
			const matches = [10, 5];
			const match = matches.find(n => count % n === 0);
			const order = match ? matches.indexOf(match) + 1 : 3;
			return {label, order};
		});

	return (
		<div className={`pattern-ruler pattern-ruler--${type}`}>
			<ul className="pattern-ruler__scale" style={{transform}}>
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
							}}>
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
		</div>
	);
}
