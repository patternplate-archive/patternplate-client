import React, {PropTypes as types} from 'react';
import {sortBy} from 'lodash';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import pure from 'pure-render-decorator';
import autobind from 'autobind-decorator';

import Message from '../common/message';
import urlQuery from '../../utils/url-query';
import getIdByPathname from '../../utils/get-id-by-pathname';
import {getPatternData, getTime, dismissMessage} from '../../actions';
import PatternFolder from '../pattern/pattern-folder';
import PatternSection from '../pattern/pattern-section';
import navigate from '../../utils/navigate';

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
		.map(child => {
			const amend = child.type === 'pattern' ?
			{
				version: child.manifest.version,
				flag: child.manifest.flag,
				tags: child.manifest.tags
			} :
			{};

			return {
				...defaults,
				id: child.id,
				name: getItemName(child, hierarchy),
				type: child.type,
				...amend
			};
		});
}

const sortTypes = ['folder', 'pattern'];
const rateType = item => sortTypes.indexOf(item.type);

@pure
@autobind
class Content extends React.Component {
	static propTypes = {
		base: types.string.isRequired,
		location: types.shape({
			pathname: types.string.isRequired
		}).isRequired,
		config: types.object.isRequired,
		dispatch: types.func.isRequired
	};

	handleDataRequest(id, query, options) {
		const {dispatch} = this.props;
		dispatch(getPatternData({id, query, options}));
	}

	handleTimeRequest() {
		const {dispatch} = this.props;
		dispatch(getTime());
	}

	handleMessageDismiss(id) {
		const {dispatch} = this.props;
		dispatch(dismissMessage(id));
	}

	handleMessageRetry(payload) {
		const {dispatch} = this.props;
		dispatch(getPatternData(payload));
	}

	render() {
		const {props} = this;
		const {base, config, location} = props;
		const {hierarchy} = config;

		const {pathname, query} = urlQuery.parse(location.pathname);
		const id = getIdByPathname(pathname, props.base);

		const fragments = id.split('/');
		const depth = fragments.length - 1;
		const up = depth > 0 ? fragments.slice(0, fragments.length - 1).join('/') : '';
		const environment = props.environment || query.environment;
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
							data={props.patterns}
							navigation={props.navigation}
							config={props.config}
							environment={environment}
							location={location}
							type={item.type}
							onDataRequest={this.handleDataRequest}
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
									pattern={message.pattern}
									payload={message.payload}
									retry={message.retry}
									file={message.file}
									timestamp={message.timestamp}
									time={props.time}
									onTimeRequest={this.handleTimeRequest}
									onDismiss={this.handleMessageDismiss}
									onRetry={this.handleMessageRetry}
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
}

export default Content;
