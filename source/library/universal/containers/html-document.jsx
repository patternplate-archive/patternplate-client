import React, {
	Component,
	PropTypes as types
} from 'react';

import {
	renderToString as render
} from 'react-dom/server';

import uuid from 'uuid';

class HTMLDocument extends Component {
	static propTypes = {
		title: types.string.isRequired,
		name: types.string.isRequired,
		base: types.string.isRequired,
		assets: types.string.isRequired,
		style: types.string.isRequired,
		script: types.string.isRequired,
		theme: types.string.isRequired,
		mode: types.string.isRequired,
		state: types.object.isRequired,
		children: types.node.isRequired
	};

	static defaultProps = {
		title: 'title',
		name: 'patternplate-client',
		base: '',
		assets: 'static',
		style: 'style',
		script: 'script',
		theme: 'light',
		mode: 'development'
	};

	uri(...args) {
		return [this.props.base, ...args].join('/');
	}

	render() {
		// Generate a unique id for the client script to pick up
		const id = `${this.props.name}-${uuid.v4()}`;

		// Generate static urls for style and script
		const assets = this.props.assets;
		const stylesheet = this.uri(assets, this.props.style, `${this.props.theme}.css`);
		const script = this.uri(assets, this.props.script, 'index.js');

		// For now we can not serialize the router state properly
		// as it contains calls against react.createElement
		// IMPORTANT: Revisit this and check if this is still the case
		const serialization = {
			__html: JSON.stringify({...this.props.state, router: null})
		};

		// Render this as sub component of HTMLDocument
		// to avoid problems with references bleeding between
		// HTMLDocument and Provider
		const content = {
			__html: render(this.props.children)
		};

		return (
			<html>
				<head>
					<title></title>
					<link rel="stylesheet" href={stylesheet} />
				</head>
				<body>
					<div data-mount={id}
						dangerouslySetInnerHTML={content} // eslint-disable-line react/no-danger
						/>
					<script
						type="application/json"
						data-mount-data={id}
						dangerouslySetInnerHTML={serialization} // eslint-disable-line react/no-danger
						/>
					<script src={script} />
				</body>
			</html>
		);
	}
}

export default HTMLDocument;
