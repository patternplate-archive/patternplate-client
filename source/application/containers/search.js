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

export default connect(mapProps, mapDispatch)(Component);

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
		location: state.routing.locationBeforeTransitions,
		value: state.search,
		suggestion
	};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onBlur: e => actions.search({persist: true, value: e.target.value}),
		onChange: e => actions.search({persist: false, value: e.target.value}),
		onComplete: value => actions.search({persist: true, value}),
		onSubmit: e => {
			e.preventDefault();
			return actions.search({persist: true, value: e.target.search.value});
		}
	}, dispatch);
}

function Component(props) {
	const withComponents = props.components.length > 0;
	const withDocs = props.docs.length > 0;
	return (
		<StyledForm
			withResults={withDocs || withComponents}
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
					onComplete={props.onComplete}
					onFocus={props.onFocus}
					placeholder="Search"
					suggestion={props.suggestion}
					title="Search for patterns [ctrl+space]"
					value={props.value}
					/>
				{
					withDocs &&
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
					withComponents &&
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
			</form>
		</StyledForm>
	);
}

Component.propTypes = {
	base: t.string.isRequired,
	components: t.array.isRequired,
	docs: t.array.isRequired,
	inline: t.bool,
	location: t.object.isRequired,
	onBlur: t.func.isRequired,
	onChange: t.func.isRequired,
	onComplete: t.func.isRequired,
	onFocus: t.func.isRequired,
	onSubmit: t.func.isRequired,
	suggestion: t.string.isRequired,
	value: t.string.isRequired
};

const StyledForm = styled.div`
	width: 100%;
	max-width: 800px;
	margin: 0 auto;
	background: inherit;
	border-color: inherit;
	padding: 60px 30px 0 30px;
	${
		props => !props.inline || props.value &&
			css`
				position: absolute;
				z-index: 5;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
			`
	}
`;

const StyledResultHeading = styled.h3`
	width: 100%;
`;

const StyledResultList = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: calc(100% + 10px);
	padding: 20px 0 0 0;
	border-color: inherit;
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
			to={{
				pathname: `/pattern/${props.id}`,
				query: props.location.query
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
			to={{
				pathname: `/doc/${props.id}`,
				query: props.location.query
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
