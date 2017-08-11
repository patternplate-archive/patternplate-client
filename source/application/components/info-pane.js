import color from 'color';
import React, {PropTypes as t} from 'react';
import semver from 'semver';
import styled from 'styled-components';
import text from 'react-addons-text-content';
import Icon from './common/icon';
import Link from './common/link';
import Text from './text';

export default InfoPane;

const StyledInfoPane = styled.div`
	position: absolute;
	z-index: 2;
	bottom: 15px;
	left: -45px; /* safe zone of 60px minus 15px margin */
	width: 300px;
	box-sizing: border-box;
	cursor: grab;
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
	padding: 5px 15px 5px 20px;
	box-sizing: border-box;
	background: ${props => props.theme.tint};
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
			<StyledInnerPane>
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
					props.dependencies && props.dependencies.length > 0 &&
						<StyledToggleHead
							name="dependencies"
							enabled={props.dependenciesEnabled}
							>
							Dependencies ({props.dependencies.length})
						</StyledToggleHead>
				}
				{
					props.dependencies && props.dependencies.length > 0 && props.dependenciesEnabled &&
						<StyledToggleBody>
							<PatternList>
								{props.dependencies.map(d => <PatternItem key={d.id} pattern={d}/>)}
							</PatternList>
						</StyledToggleBody>
				}
				{
					props.dependents && props.dependents.length > 0 &&
						<StyledToggleHead
							name="dependents"
							enabled={props.dependentsEnabled}
							>
							Dependents ({props.dependents.length})
						</StyledToggleHead>
				}
				{
					props.dependents && props.dependents.length > 0 && props.dependentsEnabled &&
						<StyledToggleBody>
							<PatternList>
								{props.dependents.map(d => <PatternItem key={d.id} pattern={d}/>)}
							</PatternList>
						</StyledToggleBody>
				}
			</StyledInnerPane>
		</StyledInfoPane>
	);
}

InfoPane.propTypes = {
	active: t.bool.isRequired,
	className: t.string,
	dependents: t.array.isRequired,
	dependentsEnabled: t.bool.isRequired,
	dependencies: t.array.isRequired,
	dependenciesEnabled: t.bool.isRequired,
	flag: t.string.isRequired,
	icon: t.string.isRequired,
	id: t.string.isRequired,
	name: t.string.isRequired,
	onMouseDown: t.func,
	onMouseUp: t.func,
	onTouchStart: t.func,
	onTouchEnd: t.func,
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
	max-height: 100px;
	width: 100%;
	margin-bottom: 10px;
	overflow: scroll;
	-webkit-overflow-scrolling: touch;
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
