import React from 'react';

export default Editor;

function Editor(props) {
	return (
		<textarea
			className={props.className}
			onChange={props.onChange}
			value={props.value}
			/>
	);
}
