import React, {Component, PropTypes as types} from 'react';
import {HistoryLocation, RouteHandler} from 'react-router';
import autobind from 'autobind-decorator';
import Fuse from 'fuse.js';

import Toolbar from './navigation/toolbar';
import Navigation from './navigation/index';

function getPatterns(haystack) {
	return Object.values(haystack)
		.reduce((registry, item) => {
			if (item.type === 'pattern') {
				return [...registry, item];
			} else if (item.type === 'folder') {
				return [...registry, ...getPatterns(item.children)];
			}
			return registry;
		}, []);
}

function filterPatterns(patterns, ids) {
	return getPatterns(patterns)
		.filter(({id}) => ids.includes(id))
		.reduce((registry, item) => {
			const fragments = item.id.split('/');
			const key = fragments[fragments.length - 1];
			return {
				...registry,
				[key]: item
			};
		}, {});
}

class Application extends Component {
	static displayName = 'Application';

	static propTypes = {
		navigation: types.object.isRequired,
		query: types.object
	};

	state = {
		fuse: null,
		query: null
	};

	searchPatterns(query) {
		const patterns = getPatterns(this.props.navigation);
		const fuse = new Fuse(patterns, {
			id: 'id',
			keys: [
				'id',
				'manifest.name',
				'manifest.tags',
				'manifest.flag'
			]
		});
		const ids = fuse.search(query);
		return filterPatterns(patterns, ids);
	}

	@autobind
	handleSearch(query) {
		const search = query ?
			`?search=${encodeURIComponent(query)}` :
			window.location.pathname;
		HistoryLocation.push(search);
	}

	render() {
		const {query: {search}} = this.props;
		const navigation = search ?
			this.searchPatterns(search) :
			this.props.navigation;

		return (
			<div className="application">
				<input type="checkbox" id="menu-state" className="menu-state"/>
				<Toolbar {...this.props}/>
				<Navigation {...this.props}
					searchValue={search}
					navigation={navigation}
					onSearch={this.handleSearch}
					/>
				<RouteHandler {...this.props}/>
			</div>
		);
	}
}

export default Application;
