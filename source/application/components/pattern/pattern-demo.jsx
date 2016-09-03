import React, {PropTypes as types} from 'react';
import queryString from 'query-string';
import urlQuery from '../../utils/url-query';
import Frame from '../common/frame';

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
		<div className="pattern-demo-container">
			<Frame
				className="pattern-demo"
				id={source}
				onLoad={props.onReady}
				onError={props.onError}
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
	loading: types.bool.isRequired,
	reloadTime: types.number,
	target: types.string.isRequired
};

export default PatternDemo;
