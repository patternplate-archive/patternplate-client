import React, {Component, PropTypes as types} from 'react';
import styled from 'styled-components';

import Icon from './icon';

const StyledSearchField = styled.label`
	display: flex;
	align-items: center;
	color: inherit;
	height: 60px;
	padding: 10px;
	border: 1px solid;
	border-color: inherit;
`;

const StyledIcon = styled(Icon)`
	flex-grow: 0;
	flex-shrink: 0;
`;

const StyledInput = styled.input`
	position: relative;
	z-index: 2;
	width: 100%;
	border: 0;
	border-radius: 0;
	background: transparent;
	color: inherit;
	line-height: inherit;
	padding: 0;
	:focus {
		outline: none;
	}
`;

const StyledInputContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	flex-grow: 1;
	flex-shrink: 0;
	margin-left: 10px;
`;

const StyledInputSuggestion = styled(p => <StyledInput {...p} readOnly/>)`
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	opacity: .3;
`;

export default class SearchField extends Component {
	static propTypes = {
		base: types.string.isRequired,
		blur: types.func.isRequired,
		className: types.string,
		component: types.node,
		linkTo: types.string.isRequired,
		name: types.string.isRequired,
		onBlur: types.func,
		onChange: types.func,
		onComplete: types.funct,
		onFocus: types.func,
		placeholder: types.string,
		suggestion: types.string,
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

	constructor(...args) {
		super(...args);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	handleKeyDown(e) {
		const {target} = e;
		const atEnd = target.selectionStart === target.value.length;
		if ((e.which === 39) && atEnd) {
			e.preventDefault();
			this.props.onComplete(this.props.suggestion);
		}
	}

	render() {
		const {
			base,
			value,
			name,
			onChange,
			onFocus,
			onBlur,
			placeholder,
			...props
		} = this.props;

		return (
			<StyledSearchField>
				<StyledIcon
					base={base}
					symbol="search"
					/>
				<StyledInputContainer>
					<StyledInputSuggestion
						value={props.suggestion || ''}
						/>
					<StyledInput
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
				</StyledInputContainer>
			</StyledSearchField>
		);
	}
}
