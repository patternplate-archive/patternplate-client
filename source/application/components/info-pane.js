import color from 'color';
import React, {PropTypes as t} from 'react';
import semver from 'semver';
import styled from 'styled-components';
import text from 'react-addons-text-content';
import Code from './common/code';
import Icon from './common/icon';
import Link from './common/link';
import Text from './text';

export default InfoPane;
export {InnerInfoPane};

const StyledInfoPane = styled.div`
	position: absolute;
	z-index: 2;
	bottom: 15px;
	left: -45px; /* safe zone of 60px minus 15px margin */
	width: 300px;
	box-sizing: border-box;
	&::before {
		content: '';
		position: absolute;
		z-index: 1;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border-radius: 10px;
		background: ${props => props.theme.tint};
	}
`;

const StyledInnerPane = styled.div`
	position: relative;
	z-index: 2;
`;

const StyledName = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	padding: 10px 15px 0 15px;
`;

const StyledDisplayName = styled(Text)`
	flex: 1 0 auto;
	color: ${props => props.theme.color};
	margin-right: 10px;
`;

const StyledId = styled(Text)`
	flex: 0 1 auto;
	color: ${props => props.theme.recess};
	text-align: right;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const StyledIcon = styled(Icon)`
	flex: 0 0 auto;
	fill: ${props => props.theme.color};
	margin-right: 5px;
`;

const StyledData = styled.table`
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
`;

const StyledDataCell = styled.td`
	box-sizing: border-box;
	height: 30px;
	padding: 4px 6px;
	border-top: 1px solid ${props => props.theme.border};
	&:first-child {
		padding-left: 20px;
	}
	&:last-child {
		text-align: right;
		padding-right: 15px;
	}
`;

const StyledKey = styled(Text)`
	font-weight: bold;
	color: ${props => props.theme.color};
`;

class SearchTrigger extends React.Component {
	constructor(...args) {
		super(...args);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e, href) {
		e.preventDefault();
		e.stopPropagation();

		if (typeof this.props.onClick === 'function') {
			this.props.onClick(e, href);
		}
	}

	render() {
		const {props} = this;
		return (
			<Link
				className={props.className}
				onClick={this.handleClick}
				query={{'search-enabled': true, 'search': `${props.field}:${props.search}`}}
				title={`Search other patterns with ${props.field} "${props.search}"`}
				>
				{props.children}
			</Link>
		);
	}
}

SearchTrigger.propTypes = {
	children: t.any,
	className: t.string.isRequired,
	field: t.string.isRequired,
	onClick: t.func,
	search: t.string.isRequired,
	title: t.string.isRequired
};

const StyledSearchTrigger = styled(SearchTrigger)`
	&:link, &:visited {
		text-decoration: none;
		color: ${props => props.theme.color};
	}
`;

const StyledVersion = styled(Version)`
	&:link, &:visited {
		text-decoration: none;
		color: ${props => {
			const v = text(props.children);
			if (!semver.valid(v)) {
				return props.theme.error;
			}
			if (semver.satisfies(v, '<=0.1')) {
				return props.theme.error;
			}
			if (semver.satisfies(v, '> 0.1 < 1')) {
				return props.theme.color;
			}
			return props.theme.success;
		}}
	}
`;

const StyledFlag = styled(StyledSearchTrigger)`
	display: inline-block;
	padding: 2px 4px;
	border: 1px solid ${props => props.theme.border};
	border-radius: 1px;
	background: ${props => getFlagColor(text(props.children), props.theme)};
	&:link, &:visited, &:active {
		color: ${props => {
			const flag = getFlagColor(text(props.children), props.theme);
			return contrast(flag, props.theme.color) >= contrast(flag, props.theme.colorNegated) ?
				props.theme.color :
				props.theme.colorNegated;
		}}
	}
`;

const StyledTag = styled(Tag)`
	display: inline-block;
	padding: 2px 4px;
	margin: 0 2px 2px 0;
	border: 1px solid ${props => props.theme.border};
	border-radius: 1px;
	&:link, &:visited, &:active {
		text-decoration: none;
		color: ${props => props.theme.color};
	}
`;

const StyledToggleHead = styled(ToggleHead)`
	display: flex;
	align-items: center;
	height: 30px;
	font-weight: bold;
	color: ${props => props.theme.color};
	padding: 3px 15px 3px 20px;
	box-sizing: border-box;
	border-top: 1px solid ${props => props.theme.border};
`;

const StyledToggleBody = styled.div`
	display: flex;
	color: ${props => props.theme.color};
	box-sizing: border-box;
	width: 100%;
	padding: 5px 15px 5px 20px;
	box-sizing: border-box;
	background: ${props => props.theme.tint};
	${props => props.compact && `
		max-height: 200px;
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
	`}
`;

const StyledCode = styled(Code)`
	width: 100%;
`;

function getFlagColor(flag, theme) {
	switch (flag) {
		case 'alpha':
			return theme.error;
		case 'beta':
			return theme.warning;
		case 'rc':
			return theme.info;
		case 'stable':
			return theme.success;
		case 'deprecated':
			return theme.error;
		default:
			return theme.error;
	}
}

function contrast(a, b) {
	return color(a).contrast(color(b));
}

function InfoPane(props) {
	if (!props.active) {
		return null;
	}

	return (
		<StyledInfoPane
			className={props.className}
			onMouseDown={props.onMouseDown}
			onMouseUp={props.onMouseUp}
			onTouchStart={props.onTouchStart}
			onTouchEnd={props.onTouchEnd}
			style={props.style}
			>
			<InnerInfoPane
				demoDependencies={props.demoDependencies}
				demoDependenciesEnabled={props.demoDependenciesEnabled}
				demoDependents={props.demoDependents}
				demoDependentsEnabled={props.demoDependentsEnabled}
				dependencies={props.dependencies}
				dependenciesEnabled={props.dependenciesEnabled}
				dependents={props.dependents}
				dependentsEnabled={props.dependentsEnabled}
				flag={props.flag}
				icon={props.icon}
				id={props.id}
				name={props.name}
				manifest={props.manifest}
				manifestEnabled={props.manifestEnabled}
				standalone
				tags={props.tags}
				version={props.version}
				/>
		</StyledInfoPane>
	);
}

InfoPane.propTypes = {
	active: t.bool.isRequired,
	className: t.string,
	demoDependents: t.array.isRequired,
	demoDependentsEnabled: t.bool.isRequired,
	demoDependencies: t.array.isRequired,
	demoDependenciesEnabled: t.bool.isRequired,
	dependents: t.array.isRequired,
	dependentsEnabled: t.bool.isRequired,
	dependencies: t.array.isRequired,
	dependenciesEnabled: t.bool.isRequired,
	flag: t.string.isRequired,
	icon: t.string.isRequired,
	id: t.string.isRequired,
	name: t.string.isRequired,
	manifest: t.string.isRequired,
	manifestEnabled: t.bool.isRequired,
	onMouseDown: t.func,
	onMouseUp: t.func,
	onTouchStart: t.func,
	onTouchEnd: t.func,
	style: t.string,
	tags: t.array.isRequired,
	version: t.string.isRequired
};

function InnerInfoPane(props) {
	const withDemoDepe = props.demoDependents && props.demoDependents.length > 0;
	const withDemoDeps = props.demoDependencies && props.demoDependencies.length > 0;
	const withDeps = props.dependencies && props.dependencies.length > 0;
	const withDepe = props.dependents && props.dependents.length > 0;

	return (
		<StyledInnerPane className={props.className}>
			<StyledName>
				<StyledIcon symbol={props.icon}/>
				<StyledDisplayName>{props.name}</StyledDisplayName>
				<StyledId>{props.id}</StyledId>
			</StyledName>
			<StyledData>
				<tbody>
					<tr>
						<StyledDataCell>
							<StyledKey>Version</StyledKey>
						</StyledDataCell>
						<StyledDataCell>
							<StyledVersion field="version" search={props.version}>
								{props.version}
							</StyledVersion>
						</StyledDataCell>
					</tr>
					<tr>
						<StyledDataCell>
							<StyledKey>Flag</StyledKey>
						</StyledDataCell>
						<StyledDataCell>
							<StyledFlag field="flag" search={props.flag}>
								<Text>{props.flag}</Text>
							</StyledFlag>
						</StyledDataCell>
					</tr>
					{
						props.tags && props.tags.length > 0 &&
							<tr>
								<StyledDataCell>
									<StyledKey>Tags</StyledKey>
								</StyledDataCell>
								<StyledDataCell>
									{props.tags.map(t => <StyledTag key={t} tag={t}/>)}
								</StyledDataCell>
							</tr>
					}
				</tbody>
			</StyledData>
			{
				withDeps &&
					<Toggle
						compact={props.standalone}
						head={`Dependencies (${props.dependencies.length})`}
						enabled={props.dependenciesEnabled}
						name="dependencies"
						>
						<PatternList>
							{props.dependencies.map(d => <PatternItem key={d.id} pattern={d}/>)}
						</PatternList>
					</Toggle>
			}
			{
				withDepe &&
					<Toggle
						compact={props.standalone}
						head={`Dependents (${props.dependents.length})`}
						enabled={props.dependentsEnabled}
						name="dependents"
						>
						<PatternList>
							{props.dependents.map(d => <PatternItem key={d.id} pattern={d}/>)}
						</PatternList>
					</Toggle>
			}
			{
				withDemoDeps &&
					<Toggle
						compact={props.standalone}
						head={`Demo Dependencies (${props.demoDependencies.length})`}
						enabled={props.demoDependenciesEnabled}
						name="demo-dependencies"
						>
						<PatternList>
							{props.demoDependencies.map(d => <PatternItem key={d.id} pattern={d}/>)}
						</PatternList>
					</Toggle>
			}
			{
				withDemoDepe &&
					<Toggle
						compact={props.standalone}
						head={`Demo Dependents (${props.demoDependents.length})`}
						enabled={props.demoDependentsEnabled}
						name="demo-dependents"
						>
						<PatternList>
							{props.demoDependents.map(d => <PatternItem key={d.id} pattern={d}/>)}
						</PatternList>
					</Toggle>
			}
			<Toggle head="Manifest" enabled={props.manifestEnabled} name="manifest">
				<StyledCode language="json">{props.manifest}</StyledCode>
			</Toggle>
		</StyledInnerPane>
	);
}

InnerInfoPane.propTypes = {
	className: t.string,
	demoDependents: t.array.isRequired,
	demoDependentsEnabled: t.bool.isRequired,
	demoDependencies: t.array.isRequired,
	demoDependenciesEnabled: t.bool.isRequired,
	dependents: t.array.isRequired,
	dependentsEnabled: t.bool.isRequired,
	dependencies: t.array.isRequired,
	dependenciesEnabled: t.bool.isRequired,
	flag: t.string.isRequired,
	icon: t.string.isRequired,
	id: t.string.isRequired,
	manifest: t.string.isRequired,
	manifestEnabled: t.bool.isRequired,
	name: t.string.isRequired,
	standalone: t.bool.isRequired,
	style: t.string,
	tags: t.array.isRequired,
	version: t.string.isRequired
};

function Version(props) {
	return (
		<SearchTrigger className={props.className} search={props.search} field="version">
			<Text>{props.search}</Text>
		</SearchTrigger>
	);
}

Version.propTypes = {
	className: t.string.isRequired,
	search: t.string.isRequired,
	children: t.string.isRequired
};

function Tag(props) {
	return (
		<SearchTrigger className={props.className} search={props.tag} field="tags">
			<Text>{props.tag}</Text>
		</SearchTrigger>
	);
}

Tag.propTypes = {
	className: t.string.isRequired,
	tag: t.string.isRequired
};

const StyledArrow = styled(Text)`
	font-size: .8em;
	transform: ${props => props.rotated ? `rotate(0deg)` : `rotate(90deg)`};
`;

const StyledHead = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	text-decoration: none;
`;

function ToggleHead(props) {
	return (
		<StyledHead query={{[`${props.name}-enabled`]: !props.enabled}} className={props.className}>
			<Text>{props.children}</Text>
			<StyledArrow rotated={props.enabled}>▼</StyledArrow>
		</StyledHead>
	);
}

ToggleHead.propTypes = {
	name: t.string.isRequired,
	enabled: t.string.isRequired,
	className: t.string.isRequired,
	children: t.string.isRequired
};

const StyledPatternList = styled.div`
	width: 100%;
`;

function PatternList(props) {
	return (
		<StyledPatternList>
			{props.children}
		</StyledPatternList>
	);
}

PatternList.propTypes = {
	children: t.any
};

const StyledPatternItem = styled(Link)`
	display: block;
	color: ${props => props.theme.color};
	text-decoration: none;
	padding: 3px 0;
`;

function PatternItem(props) {
	return (
		<StyledPatternItem href={`pattern/${props.pattern.id}`} data-id={props.pattern.id}>
			<Text>{props.pattern.manifest.displayName}</Text>
		</StyledPatternItem>
	);
}

PatternItem.propTypes = {
	pattern: t.any
};

function Toggle(props) {
	return (
		<div>
			<StyledToggleHead name={props.name} enabled={props.enabled}>
				{props.head}
			</StyledToggleHead>
			{props.enabled &&
				<StyledToggleBody compcat={props.compact}>
					{props.children}
				</StyledToggleBody>
			}
		</div>
	);
}

Toggle.propTypes = {
	children: t.any,
	compact: t.bool,
	enabled: t.bool,
	head: t.any,
	name: t.string
};
