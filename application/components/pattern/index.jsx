import React from 'react';
import moment from 'moment';

import PatternCode from './pattern-code.jsx';
import PatternDocumentation from './pattern-documentation.jsx';

const resultMap = {
	'Documentation': 'buffer',
	'Markup': 'buffer',
	'Script': 'source',
	'Style': 'source'
};

const formatMap = {
	'source': 'in',
	'buffer': 'out'
};

class Pattern extends React.Component {
	displayName = 'Pattern';

	render () {
		let results = [];

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
				'format': result[formatKey] || 'html'
			}

			if ( data.format === 'html' && resultName === 'Documentation' ) {
				results.push(<PatternDocumentation {...data}>{result[contentKey]}</PatternDocumentation>)
			} else {
				results.push(<PatternCode {...data}>{result[contentKey]}</PatternCode>)
			}
		}

		return (
			<div className="pattern">
				<h3 className="h h3">
					{this.props.manifest.name}
					<small className="small">v{this.props.manifest.version}</small>
					<small className="small">Last modified: {moment(new Date(this.props.mtime)).fromNow()}</small>
				</h3>
				{results}
			</div>
		);
	}
}

export default Pattern;
