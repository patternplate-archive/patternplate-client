import React, {Component, PropTypes as types} from 'react';
import cx from 'classnames';
import pure from 'pure-render-decorator';

import Icon from './icon';

@pure
export default class SearchField extends Component {
	static displayName = 'search-field';

	static propTypes = {
		base: types.string.isRequired,
		component: types.node,
		className: types.string,
		value: types.string,
		linkTo: types.string.isRequired,
		name: types.string.isRequired,
		placeholder: types.string,
		onChange: types.func,
		onFocus: types.func,
		onBlur: types.func
	};

	static defaultProps = {
		component: 'div',
		onChange: () => {},
		onFocus: () => {},
		onBlur: () => {}
	};

	render() {
		const {
			base,
			component: Component,
			className: userClassName,
			value,
			name,
			onChange,
			onFocus,
			onBlur,
			placeholder
		} = this.props;

		const {displayName} = SearchField;
		const className = cx(displayName, userClassName);
		const containerClassName = `${displayName}__container`;
		const iconClassName = `${displayName}__icon`;
		const inputClassName = `${displayName}__input`;

		return (
			<Component className={className}>
				<label className={containerClassName}>
					<input
						className={inputClassName}
						value={value}
						placeholder={placeholder}
						type="search"
						name={name}
						onBlur={onBlur}
						onChange={onChange}
						onFocus={onFocus}
						/>
					<Icon base={base} className={iconClassName} symbol="search"/>
				</label>
			</Component>
		);
	}
}
