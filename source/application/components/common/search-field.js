import React, {Component, PropTypes as types} from 'react';
import cx from 'classnames';
import autobind from 'autobind-decorator';
import pure from 'pure-render-decorator';

import Icon from './icon';

@pure
@autobind
export default class SearchField extends Component {
	static displayName = 'search-field';

	static propTypes = {
		base: types.string.isRequired,
		blur: types.func.isRequired,
		className: types.string,
		component: types.node,
		linkTo: types.string.isRequired,
		name: types.string.isRequired,
		onBlur: types.func,
		onChange: types.func,
		onFocus: types.func,
		placeholder: types.string,
		title: types.string,
		value: types.string
	};

	static defaultProps = {
		blur: () => {},
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
			placeholder,
			...props
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
						title={props.title}
						type="search"
						name={name}
						onBlur={onBlur}
						onChange={onChange}
						onFocus={onFocus}
						onKeyDown={this.handleKeyDown}
						/>
					<Icon base={base} className={iconClassName} symbol="search"/>
				</label>
			</Component>
		);
	}
}
