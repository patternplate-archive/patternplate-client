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
		blur: () => {},
		component: 'div',
		onChange: () => {},
		onFocus: () => {},
		onBlur: () => {}
	};

	handleKeyDown(e) {
		// if ctrl+space
		if (e.ctrlKey && e.keyCode === 32) {
			this.props.blur();
		}
	}

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
						onKeyDown={this.handleKeyDown}
						/>
					<Icon base={base} className={iconClassName} symbol="search"/>
				</label>
			</Component>
		);
	}
}
