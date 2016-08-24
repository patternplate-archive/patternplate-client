import React, {PropTypes as t} from 'react';

const PointShape = t.shape({
	x: t.number.isRequired,
	y: t.number.isRequired
});

function spline(a, b, n = 25) {
	return `M${a.x},${a.y} C${a.x + n},${a.y} ${b.x - n},${b.y} ${b.x},${b.y}`;
}

export default function Connection({from, to, n}) {
	const d = spline(from, to, n);
	return (
		<g className="connection-group">
			<circle className="connector" cx={from.x} cy={from.y} r={0.7}/>
			<path className="connection" d={d}/>
			<circle className="connector" cx={to.x} cy={to.y} r={0.7}/>
		</g>
	);
}

Connection.propTypes = {
	from: PointShape,
	to: PointShape,
	n: t.number
};

function Label(props) {
	if (!props.text) {
		return null;
	}

	const {align, height, text, y} = props;
	const width = text.length * 0.7;
	const x = align === 'left' ? props.x : props.x - width;

	return (
		<g className="label">
			<rect className="label__container" x={x} y={y - height / 2} height={height} width={width}/>
			<text className="label__text" x={x + width / 2} y={y}>{text}</text>
		</g>
	);
}
