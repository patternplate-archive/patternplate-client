import Fuse from 'fuse.js';
import React, {PropTypes as t} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import remark from 'remark';
import {createSelector} from 'reselect';
import styled, {css} from 'styled-components';
import find from 'unist-util-find';
import * as actions from '../actions';
import Markdown from '../components/common/markdown';
import SearchField from '../components/common/search-field';

const selectSearch = state => state.search;

const selectDocs = createSelector(
	state => state.schema.docs,
	flatten
);

const selectNavigation = createSelector(
	state => state.schema.meta,
	flatten
);

const selectPool = createSelector(
	selectDocs,
	selectNavigation,
	(docs, nav) => [...docs, ...nav].filter(i => i.type !== 'folder')
);

const selectFuse = createSelector(
	selectPool,
	pool => {
		return new Fuse(pool, {
			id: 'id',
			keys: [
				'contents',
				'mainfest.displayName',
				'manifest.name',
				'manifest.version',
				'manifest.tags',
				'manifest.flag'
			]
		});
	}
);

const selectMatches = createSelector(
	selectSearch,
	selectFuse,
	(search, fuse) => {
		return search ? fuse.search(search) : [];
	}
);

const selectFound = createSelector(
	selectPool,
	selectMatches,
	(pool, matches) => matches.map(match => pool.find(p => p.id === match))
);

const selectFoundDocs = createSelector(
	selectFound,
	found => found.filter(f => f.type === 'doc')
);

const selectFoundComponents = createSelector(
	selectFound,
	found => found.filter(f => f.type === 'pattern')
);

const selectSuggestion = createSelector(
	selectSearch,
	selectMatches,
	(search, matches) => matches.find(m => m.startsWith(search))
);

function flatten(tree) {
	if (!tree) {
		return [];
	}

	const init = tree.id === 'root' ? [] : [{
		id: tree.id,
		name: tree.name,
		type: tree.type,
		contents: tree.contents,
		manifest: tree.manifest
	}];

	return (tree.children || [])
		.reduce((reg, child) => {
			return [...reg, ...flatten(child)];
		}, init);
}

function mapProps(state) {
	const suggestion = selectSuggestion(state);

	return {
		base: state.base,
		components: selectFoundComponents(state),
		docs: selectFoundDocs(state),
		enabled: state.searchEnabled,
		location: state.routing.locationBeforeTransitions,
		shortcuts: state.shortcuts,
		value: state.search,
		suggestion
	};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onChange: e => actions.search({persist: true, value: e.target.value}),
		onClear: () => actions.search({persist: true, value: ''}),
		onComplete: value => actions.search({persist: true, value}),
		onFocus: () => actions.toggleSearch({focus: true}),
		onMount: () => actions.toggleSearch({sync: true}),
		onSubmit: e => {
			e.preventDefault();
			return actions.search({persist: true, value: e.target.search.value});
		}
	}, dispatch);
}

class Component extends React.Component {
	componentDidMount() {
		this.props.onMount();
	}

	render() {
		const {props} = this;
		const withComponents = props.components.length > 0;
		const withDocs = props.docs.length > 0;
		return (
			<StyledForm
				enabled={props.enabled}
				inline={props.inline}
				value={props.value}
				>
				<form onSubmit={props.onSubmit} method="GET">
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
						placeholder="Search"
						suggestion={props.suggestion}
						title={`Search for patterns ${props.shortcuts.toggleSearch.toString()}`}
						value={props.value || ''}
						>
						{props.enabled &&
							<Close
								location={props.location}
								shortcut={props.shortcuts.toggleSearch}
								/>
						}
					</SearchField>
					<HiddenSubmit/>
					<StyledResults>
						{
							withDocs && props.enabled &&
								<StyledResultList>
									<StyledResultHeading>Docs</StyledResultHeading>
									{
										props.docs.map(d => (
											<DocResult
												contents={d.contents}
												id={d.id}
												location={props.location}
												name={d.manifest.displayName}
												key={d.id}
												search={props.value}
												/>
										))
									}
								</StyledResultList>
						}
						{
							withComponents && props.enabled &&
								<StyledResultList>
									<StyledResultHeading>Components</StyledResultHeading>
									{
										props.components.map(d => (
											<ComponentResult
												id={d.id}
												location={props.location}
												name={d.manifest.displayName}
												key={d.id}
												search={props.value}
												/>
										))
									}
								</StyledResultList>
						}
					</StyledResults>
				</form>
			</StyledForm>
		);
	}
}

Component.propTypes = {
	base: t.string.isRequired,
	components: t.array.isRequired,
	docs: t.array.isRequired,
	enabled: t.bool.isRequired,
	inline: t.bool,
	location: t.object.isRequired,
	onBlur: t.func.isRequired,
	onChange: t.func.isRequired,
	onComplete: t.func.isRequired,
	onFocus: t.func,
	onMount: t.func.isRequired,
	onSubmit: t.func.isRequired,
	suggestion: t.string,
	value: t.string.isRequired
};

export default connect(mapProps, mapDispatch)(Component);

const StyledForm = styled.div`
	width: 100%;
	max-width: 800px;
	margin: 0 auto;
	background: inherit;
	padding: 30px;
	margin-top: 12.5vh;
	> form {
		height: 100%;
		overflow: hidden;
	}
	${
		props => props.enabled &&
			css`
				position: absolute;
				z-index: 5;
				top: 12.5vh;
				bottom: 12.5vh;
				right: 0;
				left: 0;
				margin-top: 0;
				border: 3px solid;
				border-color: inherit;
				overflow: hidden;
			`
	}
`;

const StyledResultHeading = styled.h3`
	width: 100%;
`;

const StyledResults = styled.div`
	height: 100%;
	overflow: scroll;
	-webkit-overflow-scroll: touch;
	border-width: 0;
	border-color: inherit;
`;

const StyledResultList = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: calc(100% + 10px);
	padding: 20px 0 0 0;
	border-width: 0;
	border-color: inherit;
	overflow: scroll;
	-webkit-overflow-scroll: touch;
`;

const StyledLink = styled(Link)`
	flex: 1 1 200px;
	display: block;
	width: 200px;
	min-height: 50px;
	max-height: 200px;
	padding: 10px 20px;
	overflow: hidden;
	border: 1px solid;
	border-color: inherit;
	margin-right: 10px;
	margin-bottom: 10px;
`;

function ComponentResult(props) {
	return (
		<StyledLink
			title={`Navigation to pattern ${props.name}`}
			to={{
				pathname: `/pattern/${props.id}`,
				query: {...props.location.query, 'search-enabled': false}
			}}
			>
			{props.name}
		</StyledLink>
	);
}

ComponentResult.propTypes = {
	id: t.string.isRequired,
	location: t.object.isRequired,
	name: t.string.isRequired
};

function DocResult(props) {
	return (
		<StyledLink
			title={`Navigation to doc ${props.name}`}
			to={{
				pathname: `/doc/${props.id}`,
				query: {...props.location.query, 'search-enabled': false}
			}}
			>
			{props.name}
			<Snippet
				search={props.search}
				contents={props.contents}
				/>
		</StyledLink>
	);
}

DocResult.propTypes = {
	id: t.string.isRequired,
	location: t.object.isRequired,
	name: t.string.isRequired,
	search: t.string.isRequired,
	contents: t.string.isRequired
};

function Snippet(props) {
	const processor = remark();
	const ast = processor.parse(props.contents);

	const match = find(ast, node => {
		if (node.type !== 'paragraph') {
			return false;
		}
		return node.children
			.filter(c => c.type === 'text')
			.some(c => c.value.includes(props.search));
	});

	if (!match) {
		return null;
	}

	return <StyledMarkdown source={processor.stringify(match)}/>;
}

Snippet.propTypes = {
	contents: t.string.isRequired,
	search: t.string.isRequired
};

const StyledMarkdown = styled(Markdown)`
	margin: 0!important;
	padding: 0!important;
	width: 200%!important;
	transform: scale(.5);
	transform-origin: 0 0;
`;

const Submit = props => <input className={props.className} type="submit"/>;

Submit.propTypes = {
	className: t.string
};

const HiddenSubmit = styled(Submit)`
	display: none;
`;

const StyledClose = styled(Link)`

`;

function Close(props) {
	return (
		<StyledClose
			to={{...props.location, query: {...props.location.query, 'search-enabled': null}}}
			title={`Close search ${props.shortcut.toString()}`}
			>
			Close
		</StyledClose>
	);
}

Close.propTypes = {
	location: t.object,
	shortcut: t.any
};
