import React, {PropTypes as t} from 'react';

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
						concern={source.concern}
						id={source.id}
						key={source.id}
						language={source.language}
						location={props.location}
						name={source.name}
						source={source.source}
						type={source.type}
						/>
				))
			}
		</div>
	);
}

PatternSources.propTypes = {
	base: t.string.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}).isRequired,
	sources: t.arrayOf(t.shape({
		active: t.bool.isRequired,
		concern: t.string.isRequired,
		id: t.string.isRequired,
		language: t.string.isRequired,
		name: t.string.isRequired,
		source: t.string.isRequired,
		type: t.string.isRequired
	}))
};

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

PatternSource.propTypes = {
	active: t.bool.isRequired,
	base: t.string.isRequired,
	id: t.string.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}).isRequired,
	name: t.string.isRequired,
	language: t.string.isRequired,
	source: t.string.isRequired,
	concern: t.string.isRequired,
	type: t.string.isRequired
};
