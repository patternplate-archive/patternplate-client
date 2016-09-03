import assert from 'assert';
import React, {PropTypes as t} from 'react';
import join from 'classnames';
import Icon from '../common/icon';

export default PatternToolEnvSelect;

const name = 'pattern-tool pattern-environment-selection';

function PatternToolEnvSelect(props) {
	const {environments: envs, environment: env} = props;
	const selected = envs.filter(item => item.id === env)[0] || {};
	const className = join(name, {
		'pattern-environment-selection--disabled': props.disabled
	});

	const title = getTitle(selected, envs);

	return (
		<label className={className}>
			<span className="pattern-environment-selection__label">
				Environment
			</span>
			<span className="pattern-environment-selection__value">
				{selected.name}
			</span>
			<select
				className="pattern-environment-selection__native"
				disabled={props.disabled}
				value={env}
				onChange={props.onChange}
				title={title}
				>
				{
					envs.map(env => {
						return (
							<option
								key={env.id}
								value={env.id}
								>
								{env.name}
							</option>
						);
					})
				}
			</select>
			<Icon
				base={props.base}
				className="pattern-environment-selection__arrow"
				symbol="arrow-right"
				/>
		</label>
	);
}

PatternToolEnvSelect.propTypes = {
	base: t.string.isRequired,
	disabled: t.bool,
	environment: t.string.isRequired,
	environments: t.arrayOf(t.shape({
		name: t.string.isRequired,
		id: t.string.isRequired
	})).isRequired,
	onChange: t.func.isRequired
};

PatternToolEnvSelect.defaultProps = {
	onChange: () => {}
};

function getTitle(selected = {}, envs = []) {
	assert.equal(typeof selected, 'object', 'selected must be an object');
	assert.ok(Array.isArray(envs), 'envs must be an array');
	const other = envs.filter(e => e.id !== selected.id);

	const lead = other[0];

	if (!lead) {
		return null;
	}

	const head = other.slice(0, other.length - 1);
	const tail = other[other.length - 1];

	const environments = tail ?
		`${head.map(e => `"${e.name}"`).join(', ')} or "${tail.name}"` :
		lead.name;

	return `Change currently active environment "${selected.name}" to ${environments}`;
}
