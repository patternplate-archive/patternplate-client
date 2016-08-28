import React from 'react';
import toh from 'hast-to-hyperscript';
export default toElements;

function toElements(data) {
	const root = toh(React.createElement, data);
	return root.props.children;
}
