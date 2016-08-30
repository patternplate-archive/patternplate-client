import React from 'react';

(function () {
	if (!global.document) {
		module.exports = props => <textarea {...props}/>;
		return;
	}

	const AceEditor = require('react-ace').default;
	require('brace/mode/json');
	require('brace/mode/markdown');
	require('brace/theme/tomorrow');
	require('brace/theme/tomorrow_night');

	module.exports = props => <AceEditor {...props}/>;
})();
