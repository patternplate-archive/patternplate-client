import React, {PropTypes as t} from 'react';
import styled, {css} from 'styled-components';
import tag from 'tag-hoc';

import Markdown from '../common/markdown';
import PatternDemo from './pattern-demo';
import Search from '../../containers/search';

const StyledPattern = styled(tag(['checkers'])('div'))`
	box-sizing: border-box;
	height: 100%;
	width: 100%;
	${props => props.checkers && css`
		&::before {
			content: '';
			position: absolute;
			z-index: 1;
			top: 0;
			right: 0;
			bottom: 0;
			left: -60px;
			width: calc(100% + 60px);
			height: 100%;
			background: ${props => checkers(props)};
			background-size: 16px 16px;
			background-position: 0 0, 8px 8px;
		`}
	}
`;

const StyledPatternFolder = styled.div`
	height: 100%;
	width: 100%;
`;

const StyledPatternDoc = styled.div`
	width: 100%;
	max-width: 800px;
	margin: 0 auto;
	padding: 30px;
	box-sizing: border-box;
`;

const StyledPatternDemo = styled.div`
	position: relative;
	z-index: 2;
	width: 100%;
	height: 100%;
	max-width: 1240px;
	margin: 0 auto;
`;

export default class Pattern extends React.Component {
	render() {
		const {props} = this;
		switch (props.type) {
			case 'pattern':
				return (
					<StyledPattern checkers={props.opacity}>
						<StyledPatternDemo>
							<PatternDemo
								base={props.base}
								height={props.demoHeight}
								loading={props.loading}
								onError={props.onDemoError}
								onReady={props.onDemoReady}
								onResize={props.onDemoContentResize}
								reloadTime={props.reloadTime}
								target={props.id.replace('pattern/', '')}
								/>
						</StyledPatternDemo>
					</StyledPattern>
				);
			case 'folder':
				return (
					<StyledPatternFolder>
						<StyledPatternDoc>
							<Markdown source={props.contents}/>
						</StyledPatternDoc>
					</StyledPatternFolder>
				);
			case 'not-found':
			default:
				return (
					<StyledPatternFolder>
						<StyledPatternDoc>
							<Search inline/>
							<Markdown source={props.contents}/>
						</StyledPatternDoc>
					</StyledPatternFolder>
				);
		}
	}
}

Pattern.propTypes = {
	id: t.string.isRequired,
	opacity: t.bool.isRequired,
	pattern: t.any.isRequired,
	type: t.string.isRequired,
	contents: t.string
	/* automount: t.bool.isRequired,
	activeSource: t.string.isRequired,
	base: t.string.isRequired,
	breadcrumbs: t.arrayOf(t.shape({
		id: t.string.isRequired,
		name: t.string.isRequired,
		target: t.shape({
			pathname: t.string.isRequired,
			query: t.object.isRequired
		}).isRequired
	})),
	code: t.arrayOf(t.shape({
		active: t.bool.isRequired,
		extname: t.string.isRequired,
		concern: t.string.isRequired,
		concerns: t.arrayOf(t.string).isRequired,
		id: t.string.isRequired,
		language: t.string.isRequired,
		name: t.string.isRequired,
		source: t.string,
		type: t.string,
		types: t.arrayOf(t.string).isRequired
	})).isRequired,
	demoContentWidth: t.number.isRequired,
	demoContentHeight: t.number.isRequired,
	demoWidth: t.number,
	demoHeight: t.number,
	dependencies: t.arrayOf(t.shape({
		id: t.string.isRequired,
		name: t.string.isRequired,
		localName: t.string.isRequired
	})).isRequired,
	dependents: t.arrayOf(t.shape({
		id: t.string.isRequired,
		name: t.string.isRequired
	})).isRequired,
	environment: t.string.isRequired,
	environments: t.arrayOf(t.shape({
		id: t.string.isRequired,
		name: t.string.isRequired
	})).isRequired,
	errored: t.bool.isRequired,
	flag: t.string,
	id: t.string.isRequired,
	loading: t.bool.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}).isRequired,
	name: t.string.isRequired,
	onDemoContentResize: t.func.isRequired,
	onDemoError: t.func.isRequired,
	onDemoReady: t.func.isRequired,
	onDemoScroll: t.func.isRequired,
	onEnvironmentChange: t.func.isRequired,
	onConcernChange: t.func.isRequired,
	onFileRequest: t.func.isRequired,
	onMount: t.func.isRequired,
	onTypeChange: t.func.isRequired,
	opacity: t.bool.isRequired,
	reload: t.func.isRequired,
	reloadTime: t.number,
	reloadedTime: t.number,
	resize: t.func.isRequired,
	rulers: t.bool.isRequired,
	rulerX: t.number.isRequired,
	rulerY: t.number.isRequired,
	rulerLengthX: t.number.isRequired,
	rulerLengthY: t.number.isRequired,
	tags: t.arrayOf(t.string).isRequired,
	version: t.string,
	sourceExpanded: t.bool */
};

function checkers(props) {
	const fill = props.theme.border;
	return `
		linear-gradient(45deg, ${fill} 25%, transparent 25%, transparent 75%, ${fill} 75%, ${fill}),
		linear-gradient(45deg, ${fill} 25%, transparent 25%, transparent 75%, ${fill} 75%, ${fill});
	`;
}
