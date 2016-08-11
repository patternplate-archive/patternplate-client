import querystring from 'querystring';
import React, {Component, PropTypes as types} from 'react';
import {HistoryLocation, RouteHandler} from 'react-router';
import autobind from 'autobind-decorator';
import {flatten} from 'lodash';
import Fuse from 'fuse.js';

import Toolbar from './navigation/toolbar';
import Navigation from './navigation/index';
import urlQuery from '../utils/url-query';

function matchPattern(pattern, criteria = {}) {
	if (Object.keys(criteria).length === 0) {
		return true;
	}

	return Object.entries(criteria)
		.every(item => {
			const [name, values] = item;

			if (values.length === 0) {
				return true;
			}

			if (name === 'tags') {
				const tags = pattern.manifest.tags || [];
				return values.some(tag => tags.includes(tag));
			} else if (name === 'flags') {
				const flag = pattern.manifest.flag || '';
				return values.some(valueFlag => valueFlag === flag);
			} else if (name === 'depends') {
				const dependencies = Object.keys(pattern.manifest.patterns || {});
				return values.some(dependency => dependencies.includes(dependency));
			} else if (name === 'provides') {
				const dependents = Object.keys(pattern.manifest.dependentPatterns || {});
				return values.some(dependent => dependents.includes(dependent));
			}

			return true;
		});
}

function getPatterns(haystack, criteria = {}) {
	return Object.values(haystack)
		.reduce((registry, item) => {
			if (item.type === 'pattern') {
				return matchPattern(item, criteria) ?
					[...registry, item] :
					registry;
			} else if (item.type === 'folder') {
				return [...registry, ...getPatterns(item.children, criteria)];
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

const tokenKeys = ['tag', 'flag', 'depends', 'provides'];

function matchesToken(key, token) {
	return token.startsWith(`${key}:`);
}

function isToken(token) {
	return tokenKeys.some(tokenKey => matchesToken(tokenKey, token));
}

function isStem(token) {
	return !isToken(token);
}

function isTagToken(token) {
	return matchesToken('tag', token);
}

function isFlagToken(token) {
	return matchesToken('flag', token);
}

function isDependsToken(token) {
	return matchesToken('depends', token);
}

function isProvidesToken(token) {
	return matchesToken('provides', token);
}

function getTokenValues(token) {
	return token
		.split(':')
		.slice(1)
		.join('.')
		.split(',')
		.filter(Boolean)
		.map(item => item.trim());
}

class Application extends Component {
	static displayName = 'Application';

	static propTypes = {
		navigation: types.object.isRequired,
		query: types.object.isRequired,
		params: types.shape({
			splat: types.string
		}).isRequired
	};

	state = {
		fuse: null,
		query: null
	};

	searchPatterns(query) {
		const fragments = query.split(' ');
		const tokens = fragments.filter(isToken);

		const stems = fragments
			.filter(isStem)
			.filter(Boolean);

		const tags = flatten(tokens.filter(isTagToken).map(getTokenValues));
		const flags = flatten(tokens.filter(isFlagToken).map(getTokenValues));
		const depends = flatten(tokens.filter(isDependsToken).map(getTokenValues));
		const provides = flatten(tokens.filter(isProvidesToken).map(getTokenValues));

		const patterns = getPatterns(this.props.navigation, {
			tags, flags, depends, provides
		});

		const fuse = new Fuse(patterns, {
			id: 'id',
			threshold: 0.3,
			keys: [
				'id',
				'manifest.name',
				'manifest.displayName',
				'manifest.tags',
				'manifest.flag'
			]
		});

		const ids = stems.length > 0 ?
			fuse.search(stems.join(' ')) :
			patterns.map(pattern => pattern.id);

		const [direct] = ids.filter(id => id === query);

		return direct ?
			filterPatterns(patterns, [direct]) :
			filterPatterns(patterns, ids);
	}

	@autobind
	handleSearch(query) {
		const search = query ?
			`?search=${encodeURIComponent(query)}` :
			global.window.location.pathname;
		HistoryLocation.push(search);
	}

	render() {
		const {props} = this;
		const {params} = props;

		const navigation = props.query.search ?
			this.searchPatterns(props.query.search) :
			this.props.navigation;

		const {query, pathname} = urlQuery.parse(params.splat);

		return (
			<div className="application">
				<input type="checkbox" id="menu-state" className="menu-state"/>
				<Toolbar {...this.props}/>
				<Navigation {...this.props}
					navigation={navigation}
					onSearch={this.handleSearch}
					pathname={pathname}
					query={query}
					searchQuery={props.query.search}
					searchValue={props.query.search}
					/>
				<RouteHandler {...this.props}
					navigation={navigation}
					pathname={pathname}
					environment={query.environment}
					/>
			</div>
		);
	}
}

export default Application;
