import React, {PropTypes as t} from 'react';
import styled from 'styled-components';

import PatternDemo from './pattern-demo';

const StyledPattern = styled.div`
	height: 100%;
	width: 100%;
	background: ${props => checkers(props)};
	${() => `
		background-size: 16px 16px;
		background-position: 0 0, 8px 8px;`}
`;

const StyledPatternDemo = styled.div`
	height: 100%;
	width: 100%;
	max-width: 1240px;
	margin: 0 auto;
`;

export default class Pattern extends React.Component {
	componentDidMount() {
		this.props.onMount();
	}

	render() {
		const {props} = this;
		return (
			<StyledPattern>
				<StyledPatternDemo>
					<PatternDemo
						base={props.base}
						contentHeight={props.demoContentHeight}
						contentWidth={props.demoContentWidth}
						environment={props.environment}
						height={props.demoHeight}
						loading={props.loading}
						onError={props.onDemoError}
						onReady={props.onDemoReady}
						onResize={props.onDemoContentResize}
						onScroll={props.onDemoScroll}
						reloadTime={props.reloadTime}
						resize={props.resize}
						resizeable={props.rulers}
						rulerLengthX={props.rulerLengthX}
						rulerLengthY={props.rulerLengthY}
						rulers={props.rulers}
						rulerX={props.rulerX}
						rulerY={props.rulerY}
						target={props.id.replace('pattern/', '')}
						width={props.demoWidth}
						/>
				</StyledPatternDemo>
			</StyledPattern>
		);
	}
}

Pattern.propTypes = {
	automount: t.bool.isRequired,
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
	sourceExpanded: t.bool
};

function checkers(props) {
	const fill = props.theme.border;
	return `
		linear-gradient(45deg, ${fill} 25%, transparent 25%, transparent 75%, ${fill} 75%, ${fill}),
		linear-gradient(45deg, ${fill} 25%, transparent 25%, transparent 75%, ${fill} 75%, ${fill});
	`;
}
