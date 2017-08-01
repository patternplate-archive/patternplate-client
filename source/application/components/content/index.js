import React, {PropTypes as t} from 'react';
import {sortBy} from 'lodash';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Markdown from '../common/markdown';
import Message from '../common/message';
import urlQuery from '../../utils/url-query';
import getIdByPathname from '../../utils/get-id-by-pathname';
import PatternFolder from '../pattern/pattern-folder';
import Pattern from '../../containers/pattern';

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

	if (!props.item) {
		return (
			<div className="application-container application-container--pattern">
				<div className="not-found-section">
					<Markdown source={getNotFoundSource(id)}/>
				</div>
			</div>
		);
	}

	const itemDefaults = {base, location};
	const items = sortBy(sortBy(getItems(props.item, hierarchy, itemDefaults, props.hide), 'name'), rateType);

	return (
		<div className="application-container application-container--pattern">
			{
				props.item.type === 'folder' &&
					<PatternFolder
						id={id}
						location={location}
						items={items}
						up={up}
						base={base}
						/>
			}
			{
				props.item.type === 'pattern' &&
					<Pattern/>
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
								pattern={String(message.pattern).trim()}
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
	hide: t.bool.isRequired,
	item: t.object.isRequired,
	location: t.shape({
		pathname: t.string.isRequired
	}).isRequired,
	navigation: t.object.isRequired,
	onDismiss: t.func.isRequired,
	onRetry: t.func.isRequired,
	messages: t.array.isRequired
};

function getItemName(item, hierarchy) {
	if (item.type === 'pattern') {
		return item.manifest.displayName || item.manifest.name || item.id;
	}
	const configured = hierarchy[item.id] || {};
	return configured.displayName || item.id;
}

function getNotFoundSource(id) {
	return `
# Pattern not found

We looked everywhere and could not find pattern \`${id}\`.

You might want to navigate back to [Home](/) or use the search.

---

Help us to make this message more helpful on [GitHub](https://github.com/sinnerschrader/patternplate)
`;
}

function getItems(root, hierarchy, defaults, hide) {
	if (root.type !== 'folder') {
		return [];
	}
	return Object.values(root.children)
		.map(selectPatternData(hierarchy, defaults, hide))
		.filter(item => item.type !== 'pattern' || item.display);
}

function selectPatternData(hierarchy, defaults, hide) {
	return child => {
		const amend = child.type === 'pattern' ?
		{
			version: child.manifest.version,
			flag: child.manifest.flag,
			tags: child.manifest.tags,
			display: hide ? child.manifest.display !== false : true
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
