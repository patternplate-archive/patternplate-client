import React, {PropTypes as t} from 'react';
import styled from 'styled-components';
import tag from 'tag-hoc';

import Code from './common/code';
import Icon from './common/icon';
import Link from './common/link';
import Markdown from './common/markdown';
import SearchField from './common/search-field';
import Text from './text';

export default class Search extends React.Component {
	constructor(...args) {
		super(...args);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUp = this.handleUp.bind(this);
		this.handleDown = this.handleDown.bind(this);
		this.handleActivate = this.handleActivate.bind(this);
	}

	componentDidMount() {
		this.props.onMount();
	}

	handleActivate(e) {
		const id = e.target.getAttribute('data-id');
		const index = [...this.props.docs, ...this.props.components].findIndex(i => i.id === id);

		if (index > -1) {
			this.props.onActivate(index);
		}
	}

	handleUp(e) {
		if (this.props.activeItem && this.props.activeItem.index > 0) {
			e.preventDefault();
			this.props.onUp();
		}
	}

	handleDown() {
		const available = this.props.components.length + this.props.docs.length - 2;

		if (this.props.activeItem && available >= this.props.activeItem.index) {
			this.props.onDown();
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.props.activeItem) {
			return this.props.onSubmit(e);
		}
		this.props.onNavigate(`/${this.props.activeItem.type}/${this.props.activeItem.id}`);
	}

	render() {
		const {props} = this;
		const withComponents = props.components.length > 0;
		const withDocs = props.docs.length > 0;
		return (
			<StyledFormBox
				enabled={props.enabled}
				inline={props.inline}
				value={props.value}
				>
				<StyledForm onSubmit={this.handleSubmit} method="GET">
					<StyledSearchFieldBox>
						<SearchField
							base={props.base}
							className="navigation__search-field"
							linkTo="/search"
							name="search"
							onBlur={props.onBlur}
							onChange={props.onChange}
							onClear={props.onClear}
							onComplete={props.onComplete}
							onFocus={props.onFocus}
							onStop={props.onStop}
							onUp={this.handleUp}
							onDown={this.handleDown}
							placeholder="Search"
							suggestion={props.suggestion}
							title={`Search for patterns ${props.shortcuts.toggleSearch.toString()}`}
							value={props.value || ''}
							>
							{props.enabled &&
								<Close
									shortcut={props.shortcuts.close}
									clears={String(props.value).length > 0}
									/>
							}
						</SearchField>
						<HiddenSubmit/>
					</StyledSearchFieldBox>
					<StyledResults>
						{
							(withComponents || withDocs) &&
								<StyledResultList>
									{withDocs > 0 &&
										<StyledResultHeading>
											Docs ({props.docs.length})
										</StyledResultHeading>
									}
									{
										props.docs.map(d => (
											<Result
												active={props.activeItem === d}
												id={d.id}
												index={d.index}
												icon={d.manifest.icon || d.type}
												name={d.manifest.displayName}
												key={d.id}
												onActivate={this.handleActivate}
												type="doc"
												/>
										))
									}
									{withComponents > 0 &&
										<StyledResultHeading>
											Components ({props.components.length})
										</StyledResultHeading>
									}
									{
										props.components.map(d => (
											<Result
												active={props.activeItem === d}
												id={d.id}
												index={d.index}
												icon={d.manifest.icon || d.type}
												name={d.manifest.displayName}
												key={d.id}
												onActivate={this.handleActivate}
												type="pattern"
												/>
										))
									}
								</StyledResultList>
						}
						{(withComponents || withDocs) &&
							<ResultPreview
								item={props.activeItem}
								/>
						}
					</StyledResults>
				</StyledForm>
			</StyledFormBox>
		);
	}
}

Search.propTypes = {
	activeItem: t.any.string,
	base: t.string.isRequired,
	components: t.array.isRequired,
	docs: t.array.isRequired,
	enabled: t.bool.isRequired,
	inline: t.bool,
	onActivate: t.func.isRequired,
	onBlur: t.func.isRequired,
	onChange: t.func.isRequired,
	onComplete: t.func.isRequired,
	onFocus: t.func,
	onMount: t.func.isRequired,
	onUp: t.func.isRequired,
	onDown: t.func.isRequired,
	onNavigate: t.func.isRequired,
	onSubmit: t.func.isRequired,
	suggestion: t.string,
	value: t.string.isRequired
};

const StyledFormBox = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 10px;
	overflow: hidden;
	pointer-events: all;
	overflow: hidden;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
	max-height: 75vh;
	&::before {
		content: '';
		position: absolute;
		z-index: 0;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: ${props => props.theme.tint};
		border-radius: 10px;
		opacity: 0.975;
	}
`;

const StyledSearchFieldBox = styled.div`
	position: relative;
	z-index: 1;
	flex: 0 0 auto;
`;

const StyledResults = styled.div`
	position: relative;
	z-index: 1;
	flex: 1 1 auto;
	display: flex;
	flex-direction: row;
	max-height: calc(75vh - 80px); /* ensure firefox scrolls result list */
	/* overflow: hidden; position: sticky breaks when doing this*/
`;

const StyledResultPreview = styled.div`
	flex: 1 1 60%;
	overflow: scroll;
	-webkit-touch-scroll: auto;
`;

const StyledResultList = styled.div`
	flex: 1 0 40%;
	overflow: scroll;
	-webkit-touch-scroll: auto;
	border-right: 1px solid ${props => props.theme.border};
`;

const StyledResultHeading = styled(Text)`
	box-sizing: border-box;
	position: -webkit-sticky;
	position: sticky;
	z-index: 1;
	top: 0;
	margin: 0;
	font-size: 14px;
	padding: 3px 15px;
	border-width: 1px 0;
	border-style: solid;
	border-color: ${props => props.theme.border};
	color: ${props => props.theme.color};
	background: ${props => props.theme.background};
`;

const StyledIcon = styled(tag(['active'])(Icon))`
	fill: ${props => props.active ? props.theme.active : props.theme.color};
	margin-right: 10px;
`;

const Linkable = tag(['active'])(Link);

const StyledPreviewLink = styled(Linkable)`
	position: absolute;
	right: 15px;
	top: 50%;
	transform: translateY(-50%);
	text-decoration: none;
	color: ${props => props.theme.border};
	opacity: 0;
	&:hover {
		color: ${props => props.theme.color};
		text-decoration: underline;
	}
`;

const StyledResultLink = styled(Linkable)`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 10px 15px;
	line-height: 20px;
	color: ${props => props.active ? props.theme.active : props.theme.color};
	text-decoration: none;
`;

const StyledResult = styled.div`
	position: relative;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	&:hover ${StyledPreviewLink} {
		opacity: 1;
	}
`;


function Result(props) {
	return (
		<StyledResult
			active={props.active}
			title={`Navigation to pattern ${props.name}`}
			data-id={props.id}
			>
			<StyledResultLink active={props.active} href={`/${props.type}/${props.id}`} query={{'search-enabled': false}}>
				<StyledIcon active={props.active} size="m" symbol={props.icon}/>
				<Text active={props.active} size="l">{props.name}</Text>
			</StyledResultLink>
			<StyledPreviewLink active={props.active} query={{'search-preview': props.index}}>
				<Text active={props.active} size="s">Preview</Text>
			</StyledPreviewLink>
		</StyledResult>
	);
}

Result.propTypes = {
	active: t.bool,
	icon: t.string.isRequired,
	id: t.string.isRequired,
	index: t.number.isRequired,
	name: t.string.isRequired,
	type: t.string.isRequired,
	onHover: t.func
};

const Submit = props => <input className={props.className} type="submit"/>;

Submit.propTypes = {
	className: t.string
};

const HiddenSubmit = styled(Submit)`
	display: none;
`;

const StyledClose = styled(Link)`
	font-size: 0;
	line-height: 0;
`;

const StyledCloseIcon = styled(Icon)`
	fill: ${props => props.theme.color};
`;

function Close(props) {
	const verb = props.clears ? `Clear` : 'Close';
	const query = props.clears ? {search: null} : {'search-enabled': null};
	const symbol = props.clears ? 'return' : 'close';
	return (
		<StyledClose
			query={query}
			title={`${verb} search ${props.shortcut.toString()}`}
			>
			<StyledCloseIcon size="s" symbol={symbol}/>
			{verb}
		</StyledClose>
	);
}

Close.propTypes = {
	clears: t.bool,
	shortcut: t.any
};

const StyledMarkdown = styled(Markdown)`
	width: 80%;
	margin: 0 auto;
`;

function ResultPreview(props) {
	if (!props.item) {
		return null;
	}
	switch (props.item.type) {
		case 'doc':
			return (
				<StyledResultPreview>
					<StyledMarkdown source={props.item.contents}/>
				</StyledResultPreview>
			);
		default:
			return (
				<StyledResultPreview>
					<Code language="json">{JSON.stringify(props.item, null, '  ')}</Code>
				</StyledResultPreview>
			);
	}
}

ResultPreview.propTypes = {
	item: t.any
};
