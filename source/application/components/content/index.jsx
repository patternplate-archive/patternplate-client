import React, {PropTypes as t} from 'react';
import {sortBy} from 'lodash';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Message from '../common/message';
import urlQuery from '../../utils/url-query';
import getIdByPathname from '../../utils/get-id-by-pathname';
import PatternFolder from '../pattern/pattern-folder';
import PatternSection from '../pattern/pattern-section';
import navigate from '../../utils/navigate';

export default Content;

const sortTypes = ['folder', 'pattern'];
const rateType = item => sortTypes.indexOf(item.type);

function Content(props) {
	const {base, config, location} = props;
	const {hierarchy} = config;

	const {pathname} = urlQuery.parse(location.pathname);
	const id = getIdByPathname(pathname, props.base);

	const fragments = id.split('/');
	const depth = fragments.length - 1;
	const up = depth > 0 ? fragments.slice(0, fragments.length - 1).join('/') : '';
	const item = navigate(id, props.navigation);
	const itemDefaults = {base, location};
	const items = sortBy(sortBy(getItems(item, hierarchy, itemDefaults), 'name'), rateType);

	return (
		<div className="application-container application-container--pattern">
			{
				item.type === 'folder' &&
					<PatternFolder
						id={id}
						location={location}
						items={items}
						up={up}
						base={base}
						/>
			}
			{
				item.type === 'pattern' &&
					<PatternSection
						id={id}
						data={props.pattern}
						navigation={props.navigation}
						config={props.config}
						location={location}
						type={item.type}
						onDataRequest={props.onLoad}
						base={base}
						/>
			}
			<CSSTransitionGroup
				component="aside"
				transitionName="pattern-content-transition"
				className="messages"
				transitionEnterTimeout={300}
				transitionLeaveTimeout={300}
				>
				{
					props.messages.map(message => {
						return (
							<Message
								id={message.id}
								key={message.id}
								type={message.type}
								title={message.subject}
								body={message.body || message.stack}
								pattern={message.pattern.trim()}
								payload={message.payload}
								retry={message.retry}
								file={message.file}
								timestamp={message.timestamp}
								onDismiss={props.onDismiss}
								onRetry={props.onRetry}
								location={location}
								base={base}
								/>
						);
					})
				}
			</CSSTransitionGroup>
		</div>
	);
}

Content.propTypes = {
	base: t.string.isRequired,
	config: t.object.isRequired,
	location: t.shape({
		pathname: t.string.isRequired
	}).isRequired,
	navigation: t.object.isRequired,
	onDismiss: t.func.isRequired,
	onLoad: t.func.isRequired,
	onRetry: t.func.isRequired,
	pattern: t.object.isRequired,
	messages: t.array.isRequired
};

function getItemName(item, hierarchy) {
	if (item.type === 'pattern') {
		return item.manifest.displayName || item.manifest.name || item.id;
	}
	const configured = hierarchy[item.id] || {};
	return configured.displayName || item.id;
}

function getItems(root, hierarchy, defaults) {
	if (root.type !== 'folder') {
		return [];
	}
	return Object.values(root.children)
		.map(selectPatternData(hierarchy, defaults))
		.filter(item => item.type !== 'pattern' || item.display);
}

function selectPatternData(hierarchy, defaults) {
	return child => {
		const amend = child.type === 'pattern' ?
		{
			version: child.manifest.version,
			flag: child.manifest.flag,
			tags: child.manifest.tags,
			display: child.manifest.display !== false
		} :
		{};

		return {
			...defaults,
			id: child.id,
			name: getItemName(child, hierarchy),
			type: child.type,
			...amend
		};
	};
}
