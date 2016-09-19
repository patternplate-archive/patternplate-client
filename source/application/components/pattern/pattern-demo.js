import React, {PropTypes as types} from 'react';
import join from 'classnames';
import queryString from 'query-string';
import urlQuery from '../../utils/url-query';
import Frame from '../common/frame';
import Ruler from './pattern-ruler';

function PatternDemo(props) {
	const source = urlQuery.format({
		pathname: `${props.base}demo/${props.target}/index.html`,
		query: {environment: props.environment}
	});

	const query = queryString.stringify({
		'reload-time': props.reloadTime
	});

	const src = [source, query].filter(Boolean).join('?');
	const className = join('pattern-demo-container', {
		'pattern-demo-container--opacity': props.opacity
	});
	const demoClassName = join('pattern-demo', {
		'pattern-demo--resizable': props.resizeable
	});

	return (
		<div className={className}>
			{
				props.rulers &&
					<div className="rulers">
						<Ruler
							type="vertical"
							step={10}
							length={props.rulerLengthY}
							markers={[props.height]}
							offset={props.rulerY}
							/>
						<Ruler
							type="horizontal"
							step={10}
							length={props.rulerLengthX}
							markers={[props.width]}
							offset={props.rulerX}
							/>
					</div>
			}
			<Frame
				className={demoClassName}
				id={source}
				height={props.height}
				onLoad={props.onReady}
				onError={props.onError}
				onScroll={props.onScroll}
				onResize={props.onResize}
				resizeable={props.rulers}
				resize={props.resize}
				src={src}
				width={props.width}
				/>
		</div>
	);
}

PatternDemo.propTypes = {
	base: types.string.isRequired,
	environment: types.string.isRequired,
	height: types.number,
	onError: types.func.isRequired,
	onReady: types.func.isRequired,
	onResize: types.func.isRequired,
	onScroll: types.func.isRequired,
	opacity: types.bool.isRequired,
	loading: types.bool.isRequired,
	reloadTime: types.number,
	resizeable: types.bool.isRequired,
	resize: types.func.isRequired,
	rulers: types.bool.isRequired,
	rulerX: types.number.isRequired,
	rulerLengthX: types.number.isRequired,
	rulerY: types.number.isRequired,
	rulerLengthY: types.number.isRequired,
	target: types.string.isRequired,
	width: types.number
};

export default PatternDemo;
