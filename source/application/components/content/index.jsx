import React, {PropTypes as types} from 'react';
import {sortBy} from 'lodash';

// import Messages from './messages';
import {getPatternData} from '../../actions';
import PatternFolder from '../pattern/pattern-folder';
import PatternSection from '../pattern/pattern-section';
import pure from 'pure-render-decorator';
import autobind from 'autobind-decorator';

import urlQuery from '../../utils/url-query';

function navigate(id, navigation) {
	let scope = navigation;
	const fragments = id.split('/');
	for (const fragment of fragments) {
		if (fragment in scope) {
			scope = scope[fragment];
			continue;
		}

		if (fragment in scope.children) {
			scope = scope.children[fragment];
			continue;
		}

		return null;
	}
	return scope;
}

function getItemName(item, hierarchy) {
	if (item.type === 'pattern') {
		return item.manifest.displayName || item.manifest.name || item.id;
	}
	const configured = hierarchy[item.id] || {};
	return configured.displayName || item.id;
}

function getItems(root, hierarchy) {
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

	render() {
		const {props} = this;
		const {hierarchy} = props.config;

		const {pathname, query} = urlQuery.parse(props.location.pathname);
		const id = pathname.split('/').filter(Boolean).slice(1).join('/');
		const fragments = id.split('/');
		const depth = fragments.length - 1;
		const up = depth > 0 ? fragments.slice(0, fragments.length - 1).join('/') : '';
		const environment = props.environment || query.environment;
		const item = navigate(id, props.navigation);
		const items = sortBy(sortBy(getItems(item, hierarchy), 'name'), rateType);

		return (
			<main className="content">
				{
					item.type === 'folder' &&
						<PatternFolder
							id={id}
							location={props.location}
							items={items}
							up={up}
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
							location={props.location}
							type={item.type}
							onDataRequest={this.handleDataRequest}
							/>
				}
			</main>
		);
	}
}

export default Content;
