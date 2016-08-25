import React from 'react';

import PatternControl from './pattern-control';
import PatternCode from './pattern-code';
import PatternDocumentation from './pattern-documentation';

export default PatternSources;

function PatternSources(props) {
	const {sources} = props;
	return (
		<div className="pattern-sources">
			{
				sources.map(source => (
					<PatternSource
						active={source.active}
						base={props.base}
						buffer={source.buffer}
						concern={source.concern}
						id={source.id}
						key={source.id}
						language={source.language}
						location={props.location}
						name={source.name}
						shortid={source.id}
						source={source.source}
						type={source.type}
						/>
				))
			}
		</div>
	);
}

function PatternSource(props) {
	return (
		<div className="pattern-source">
			<PatternControl
				active={props.active}
				base={props.base}
				expand
				key={props.id}
				location={props.location}
				name={props.name}
				shortid={props.id}
				/>
			{
				props.active && props.language === 'md' &&
					<PatternDocumentation
						base={props.base}
						name={props.name}
						source={props.source}
						/>
			}
			{
				props.active && props.language !== 'md' &&
					<PatternCode
						base={props.base}
						concern={props.concern}
						copy
						format={props.language}
						highlight
						id={props.id}
						name={props.name}
						source={props.source}
						type={props.type}
						/>
			}
		</div>
	);
}

function PatternArtifact() {
	
}
