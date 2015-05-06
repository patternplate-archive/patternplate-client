import React from 'react';
import moment from 'moment';

import PatternCode from './pattern-code';
import PatternDocumentation from './pattern-documentation';
import PatternControl from './pattern-control';
import PatternDemo from './pattern-demo';

import Headline from '../common/headline';

const resultMap = {
	'Documentation': 'buffer',
	'Markup': 'buffer',
	'Script': 'demoSource',
	'Style': 'source'
};

const formatMap = {
	'source': 'in',
	'buffer': 'out',
	'demoSource': 'in',
	'demoBuffer': 'out'
};

class Pattern extends React.Component {
	displayName = 'Pattern';

	state = {
		'active': []
	};

	static comprehend(results, id) {
		let items = [];

		for (let resultName of Object.keys(results)) {
			let result = results[resultName];
			let contentKey = resultMap[resultName];
			let formatKey = formatMap[contentKey];
			let name = resultName.toLowerCase();

			if ( typeof result !== 'object' || typeof contentKey === 'undefined' ) {
				continue;
			}

			items.push({
				'name': resultName,
				'key': [id, name].join('/'),
				'controlKey': [id, name, 'control'].join('/'),
				'id': [id, name].join('/'),
				'format': result[formatKey] || 'html',
				'content': result[contentKey]
			});
		}

		return items;
	}

	componentWillMount () {
		this.items = Pattern.comprehend(this.props.results, this.props.id);
	}

	componentWillReceiveProps (props) {
		this.items = Pattern.comprehend(props.results, props.id);
	}

	updateControls (id, checked) {
		let active = this.state.active.slice(0);
		let index = active.indexOf(id);

		if (checked && index === - 1) {
			active.push(id);
		} else if ( index !== -1 ) {
			active.splice(index, 1);
		}

		this.setState({
			'active': active
		});
	}

	closeControls ( ids = this.state.active ) {
		let diff = this.state.active.filter((id) => ids.indexOf(id) === -1);

		this.setState({
			'active': diff
		});
	}

	onControlChange (e) {
		this.updateControls(e.target.id, e.target.checked);
	}

	onCloseClick () {
		this.closeControls();
	}

	render () {
		let results = [];
		let controls = [];
		let content;

		let fullscreen = `/demo/${this.props.id}`;

		for (let item of this.items) {
			let isDoc = item.format === 'html' && item.name === 'Documentation';
			let isActive = this.state.active.indexOf(item.id) > -1;

			if (item.content.length === 0) {
				continue;
			}

			results.push(<input className="pattern-state" type="checkbox" id={item.id} key={item.controlKey} checked={isActive} onChange={(e) => this.onControlChange(e)} />);
			results.push(isDoc ? <PatternDocumentation {...item}>{item.content}</PatternDocumentation> : <PatternCode {...item}>{item.content}</PatternCode>);
			controls.push(<PatternControl {...item} id={item.controlKey} key={item.controlKey} target={item.key} active={isActive} />);
		}

		return (
			<div className="pattern">
				<Headline className="pattern-header" order={2}>
					<span className="pattern-name">{this.props.manifest.name}</span>
					<small className="pattern-version">v{this.props.manifest.version}</small>
					<small className="pattern-lastmodified">Last modified: {moment(new Date(this.props.mtime)).fromNow()}</small>
				</Headline>
				<PatternDemo target={this.props.id} />
				<div className="pattern-toolbar">
					{controls}
					<button className="pattern-control pattern-tool" type="button"
						onClick={(e) => this.onCloseClick(e)}
						disabled={this.state.active.length === 0}>Close all</button>
					<a className="pattern-control pattern-tool" href={fullscreen} target="_blank">Fullscreen</a>
				</div>
				<div className="pattern-content">{results}</div>
			</div>
		);
	}
}

export default Pattern;
