import queryString from 'query-string';
import React, {PropTypes as types} from 'react';
import styled from 'styled-components';

import urlQuery from '../../utils/url-query';
import Frame from '../common/frame';
import Ruler from './pattern-ruler';

const StyledDemo = styled.div`
	width: 100%;
	height: 100%;
`;

function PatternDemo(props) {
	const source = urlQuery.format({
		pathname: `${props.base}demo/${props.target}/index.html`,
		query: {environment: props.environment}
	});

	const query = queryString.stringify({
		'reload-time': props.reloadTime
	});

	const src = [source, query].filter(Boolean).join('?');

	return (
		<StyledDemo>
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
				height={props.height}
				id={source}
				onError={props.onError}
				onLoad={props.onReady}
				onResize={props.onResize}
				onScroll={props.onScroll}
				resize={props.resize}
				resizeable={props.rulers}
				src={src}
				width={props.width}
				/>
		</StyledDemo>
	);
}

PatternDemo.propTypes = {
	base: types.string.isRequired,
	environment: types.string.isRequired,
	height: types.number,
	onError: types.func.isRequired,
	onResize: types.func.isRequired,
	onReady: types.func.isRequired,
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
