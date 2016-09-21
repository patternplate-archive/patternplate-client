import React, {PropTypes as t} from 'react';
import join from 'classnames';
import Block from './block';

export default function BlockColumn(props) {
	const {
		activeBlock, align, base, items, x, y, location, connect, height, onClick,
		onMouseEnter, onMouseLeave
	} = props;

	return (
		<g>
			{
				items.map(({name, id, localName}, index) => {
					const label = [name, localName].join('');
					const width = Math.max(5, label.length * 0.8);
					const offset = align === 'right' ? width + 1 : 0;
					const n = (50 - width) / 3;
					const key = [id, name, localName].filter(Boolean).join(':');

					return (
						<Block
							active={activeBlock === key}
							type="block"
							base={base}
							id={id}
							blockId={key}
							name={name}
							x={x - offset}
							key={key}
							y={y + index * (height + 1)}
							width={width}
							height={height}
							connect={{...connect, n}}
							onClick={onClick}
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
							location={location}
							/>
					);
				})
			}
			{
				items.map(({name, localName, id}, index) => {
					const label = [name, localName].join('');
					const text = align === 'right' ? localName : id;
					const width = Math.max(5, label.length * 0.8);
					const labelWidth = Math.max(4, text.length * 0.6);
					const key = [id, name, localName].filter(Boolean).join(':');
					const labelX = align === 'right' ? x - width : x + width;
					const offset = align === 'right' ? 1 : 0;
					return (
						<Label
							active={activeBlock === key}
							align={align}
							key={key}
							width={labelWidth}
							height={1.4}
							x={labelX - offset}
							y={y + index * (height + 1) + (height / 2) - 0.7}
							text={text}
							/>
						);
				})
			}
			{
				items.map(item => {
					const labelAlign = align === 'left' ? 'right' : 'left';
					const text = align === 'right' ? item.id : item.localName;
					const key = [item.id, item.name, item.localName].filter(Boolean).join(':');
					const labelWidth = Math.max(4, text.length * 0.6);

					return (
						<Label
							active={activeBlock === key}
							align={labelAlign}
							key={key}
							text={text}
							width={labelWidth}
							height={1.4}
							x={connect.x}
							y={connect.y - 0.7}
							/>
					);
				})
			}
		</g>
	);
}

BlockColumn.propTypes = {
	base: t.string.isRequired,
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

function Label(props) {
	if (!props.text) {
		return null;
	}

	const x = props.align === 'right' ? (props.x - props.width) : props.x;
	const className = join('label', {
		'label--active': props.active
	});

	return (
		<g className={className}>
			<circle
				className="label__circle"
				cx={x + props.width}
				cy={props.y + props.height / 2}
				r={0.7}
				/>
			<circle
				className="label__circle"
				cx={x}
				cy={props.y + props.height / 2}
				r={0.7}
				/>
			<rect
				height={props.height}
				width={props.width}
				x={x}
				y={props.y}
				className="label__container"
				/>
			<text
				x={x + props.width / 2}
				y={props.y - 0.175 + props.height / 2}
				className="label__text">
				{props.text}
			</text>
		</g>
	);
}
