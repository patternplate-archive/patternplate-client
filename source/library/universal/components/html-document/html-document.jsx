import React, {Component} from 'react';

class HTMLDocument extends Component {
	static defaultProps = {
		title: 'title',
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
		const assets = this.props.assets;
		const stylesheet = this.uri(assets, this.props.style, `${this.props.theme}.css`);
		const script = this.uri(assets, this.props.script, `${this.props.mode}.js`);
		const state = {__html: JSON.stringify(this.props.state)};

		return (
			<html>
				<head>
					<title></title>
					<link rel="stylesheet" href={stylesheet} />
				</head>
				<body>
					<div data-mount-node>
						{this.props.children}
					</div>
					<script
						type="application/json"
						data-mount-data
						dangerouslySetInnerHTML={state} />
					<script src={script} />
				</body>
			</html>
		);
	}
}

export default HTMLDocument;
