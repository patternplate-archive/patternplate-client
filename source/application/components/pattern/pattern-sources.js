import React, {Component, PropTypes as t} from 'react';
import join from 'classnames';
import autobind from 'autobind-decorator';

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
						concerns={source.concerns}
						environment={props.environment}
						id={source.id}
						key={source.id}
						language={source.language}
						loading={source.loading}
						location={props.location}
						name={source.name}
						onConcernChange={props.onConcernChange}
						onFileRequest={props.onFileRequest}
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
	environment: t.string.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}).isRequired,
	onConcernChange: t.func.isRequired,
	onFileRequest: t.func.isRequired,
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

@autobind
class PatternSource extends Component {
	static propTypes = {
		active: t.bool.isRequired,
		base: t.string.isRequired,
		concern: t.string.isRequired,
		concerns: t.arrayOf(t.string).isRequired,
		environment: t.string.isRequired,
		id: t.string.isRequired,
		loading: t.bool.isRequired,
		location: t.shape({
			pathname: t.string.isRequired,
			query: t.object.isRequired
		}).isRequired,
		name: t.string.isRequired,
		language: t.string.isRequired,
		onFileRequest: t.func.isRequired,
		source: t.string.isRequired,
		type: t.string.isRequired
	};

	componentDidMount() {
		const {props} = this;
		if (!props.source && props.active) {
			props.onFileRequest({
				id: props.id,
				environment: props.environment,
				type: props.type,
				base: props.base
			});
		}
	}

	componentWillUpdate(next) {
		if (next.active && !next.source) {
			next.onFileRequest({
				id: next.id,
				environment: next.environment,
				type: next.type,
				base: next.base
			});
		}
	}

	render() {
		const {props} = this;
		const className = join('pattern-source', {
			'pattern-source--loading': props.loading
		});

		return (
			<div className={className}>
				<PatternControl
					active={props.active}
					base={props.base}
					disabled={props.loading}
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
							concerns={props.concerns}
							copy
							format={props.language}
							highlight
							id={props.id}
							name={props.name}
							onConcernChange={props.onConcernChange}
							source={props.source}
							type={props.type}
							/>
				}
			</div>
		);
	}
}
