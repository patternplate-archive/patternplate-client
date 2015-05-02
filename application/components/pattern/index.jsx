import React from 'react';
import moment from 'moment';

import PatternCode from './pattern-code.jsx';
import PatternDocumentation from './pattern-documentation.jsx';
import PatternControl from './pattern-control.jsx';
import Headline from '../common/headline.jsx';

const resultMap = {
	'Documentation': 'buffer',
	'Markup': 'buffer',
	'Script': 'source',
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

	render () {
		let results = [];
		let controls = [];
		let content;

		for (let resultName of Object.keys(this.props.results)) {
			let result = this.props.results[resultName];
			let contentKey = resultMap[resultName];
			let formatKey = formatMap[contentKey];
			let name = resultName.toLowerCase();

			if ( typeof result !== 'object' || typeof contentKey === 'undefined' ) {
				continue;
			}

			let data = {
				'name': resultName,
				'key': [this.props.id, name].join('/'),
				'id': [this.props.id, name].join('/'),
				'format': result[formatKey] || 'html'
			}

			if ( data.format === 'html' && resultName === 'Documentation' ) {
				content = <PatternDocumentation {...data}>{result[contentKey]}</PatternDocumentation>
			} else {
				content = <PatternCode {...data}>{result[contentKey]}</PatternCode>
			}

			results.push(<input className="pattern-state" type="checkbox" id={data.id} />);
			results.push(content);
			controls.push(<PatternControl {...data} target={data.key} />);
		}

		return (
			<div className="pattern">
				<Headline className="pattern-header" order={2}>
					<span className="pattern-name">{this.props.manifest.name}</span>
					<small className="pattern-version">v{this.props.manifest.version}</small>
					<small className="pattern-lastmodified">Last modified: {moment(new Date(this.props.mtime)).fromNow()}</small>
				</Headline>
				<div className="pattern-toolbar">
					{controls}
					<button className="pattern-control" type="button">Close all</button>
				</div>
				<div className="pattern-content">{results}</div>
			</div>
		);
	}
}

export default Pattern;
