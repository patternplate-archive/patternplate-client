import React, {PropTypes as types} from 'react';
import join from 'classnames';
import queryString from 'query-string';
import urlQuery from '../../utils/url-query';
import Frame from '../common/frame';
import Ruler from '../../containers/ruler';

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
		[`pattern-demo-container--opacity`]: props.opacity
	});

	return (
		<div className={className}>
			{
				props.rulers &&
					<div className="rulers">
						<Ruler
							type="vertical"
							step={10}
							length={2800}
							/>
						<Ruler
							type="horizontal"
							step={10}
							length={2800}
							/>
					</div>
			}
			<Frame
				className="pattern-demo"
				id={source}
				onLoad={props.onReady}
				onError={props.onError}
				onScroll={props.onScroll}
				src={src}
				/>
		</div>
	);
}

PatternDemo.propTypes = {
	base: types.string.isRequired,
	environment: types.string.isRequired,
	onError: types.func.isRequired,
	onReady: types.func.isRequired,
	opacity: types.bool.isRequired,
	loading: types.bool.isRequired,
	reloadTime: types.number,
	rulers: types.bool.isRequired,
	target: types.string.isRequired
};

export default PatternDemo;
