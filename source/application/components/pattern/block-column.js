import React, {PropTypes as t} from 'react';
import Block from './block';

export default function BlockColumn(props) {
	const {
		align,
		items,
		x,
		y,
		location,
		connect,
		height,
		onClick
	} = props;

	if (items.length === 0) {
		return null;
	}

	return (
		<g>
			{
				items.map(({name, id}, index) => {
					const width = Math.max(5, name.length * 1.25);
					const offset = align === 'right' ? width + 1 : 0;
					const n = (50 - width) / 3;
					return (
						<Block
							type="block"
							id={id}
							name={name}
							x={x - offset}
							key={[id, name].join(':')}
							y={y + index * (height + 1)}
							width={width}
							height={height}
							connect={{...connect, n}}
							onClick={onClick}
							location={location}
							/>
					);
				})
			}
			{
				/* items.length > 0 && description &&
					[
						<text
							className="column-description"
							x={center.x}
							y={center.y}
							textAnchor="middle"
							alignmentBaseline="central"
							key="column-description"
							>
							{description}
						</text>
					] */
			}
		</g>
	);
}

BlockColumn.propTypes = {
	items: t.arrayOf(t.shape({
		name: t.string.isRequired,
		id: t.string.isRequired
	})).isRequired,
	x: t.oneOfType([t.string, t.number]).isRequired,
	y: t.oneOfType([t.string, t.number]).isRequired,
	onClick: t.func.isRequired,
	align: t.oneOf(['left', 'right']).isRequired,
	prefix: t.string,
	location: t.shape({
		pathname: t.string,
		query: t.any
	}),
	connect: t.shape({
		x: t.oneOfType([t.string, t.number]).isRequired,
		y: t.oneOfType([t.string, t.number]).isRequired
	}).isRequired,
	description: t.string,
	height: t.number
};

BlockColumn.defaultProps = {
	items: [],
	y: 0,
	onClick: () => {},
	align: 'left',
	description: ''
};
