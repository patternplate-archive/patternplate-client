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
