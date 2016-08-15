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
