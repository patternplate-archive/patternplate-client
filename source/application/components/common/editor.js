import React, {Component} from 'react';

function forceResize(window) {
	const {CustomEvent} = window;
	const event = new CustomEvent('resize');
	event.initEvent('resize');
	window.dispatchEvent(event);
}

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

	module.exports = class Editor extends Component {
		componentDidMount() {
			forceResize(global);
		}

		render() {
			const {props} = this;
			return <AceEditor {...props}/>;
		}
	};
})();
