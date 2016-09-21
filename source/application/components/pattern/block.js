import React, {PropTypes as t, Component} from 'react';
import autobind from 'autobind-decorator';
import querystring from 'querystring';
import Connection from './connection';

@autobind
export default class Block extends Component {
	static propTypes = {
		base: t.string.isRequired,
		name: t.string.isRequired,
		id: t.string.isRequired,
		type: t.string.isRequired,
		x: t.oneOfType([t.string, t.number]).isRequired,
		y: t.oneOfType([t.string, t.number]).isRequired,
		width: t.number.isRequired,
		height: t.number.isRequired,
		connect: t.shape({
			x: t.oneOfType([t.string, t.number]).isRequired,
			y: t.oneOfType([t.string, t.number]).isRequired,
			n: t.number
		}),
		onClick: t.func.isRequired,
		location: t.shape({
			pathname: t.string,
			query: t.any
		}).isRequired
	};

	static defaultProps = {
		type: 'block',
		width: 8,
		height: 8,
		onClick: () => {},
		onMouseEnter: () => {},
		onMouseLeave: () => {}
	};

	handleClick(e) {
		e.preventDefault();
		this.props.onClick(this.props);
	}

	render() {
		const {props} = this;
		const {location, base} = props;
		const className = `pattern-dependencies__${props.type}`;
		const orientation = props.x < 50 ? 1 : 0;

		const onMouseEnter = () => props.onMouseEnter(props.blockId);
		const onMouseLeave = () => props.onMouseLeave(props.blockId);

		const block = {
			x: props.x + props.width * orientation,
			y: props.y + (props.height / 2)
		};

		const target = props.connect;

		const from = orientation === 1 ? block : target;
		const to = orientation === 1 ? target : block;

		const textX = props.type === 'root' ? 50 : props.x + props.width / 2;
		const textY = props.y + props.height / 2;

		const href = [
			`${base}pattern/${props.id}`,
			querystring.stringify(location.query)
		].join('?');

		return (
			<g className="block-group" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
				<a xlinkHref={href} className={className}>
					<rect
						className={className}
						x={props.x}
						y={props.y}
						width={props.width}
						height={props.height}
						onClick={this.handleClick}
						/>
				</a>
				{
					props.connect &&
						<Connection
							labels={[props.id, props.localName]}
							from={from}
							to={to}
							n={target.n || 20}
							/>
				}
				{
					props.name &&
						<a xlinkHref={href}>
							<text
								x={textX}
								y={textY}
								width={props.width}
								height={props.height}
								className="block-name"
								>
								{props.name}
							</text>
						</a>
				}
			</g>
		);
	}
}
