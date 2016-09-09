import React from 'react';
import {merge} from 'lodash';

export default wrap;

function wrap(Component, options) {
	const h = React.createElement;
	return (tagName, props, children) => {
		return h(Component, merge({}, options, props), children);
	};
}
