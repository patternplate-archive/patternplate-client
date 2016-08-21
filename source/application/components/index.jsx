import React, {Component, PropTypes as types} from 'react';
import autobind from 'autobind-decorator';
import {flatten} from 'lodash';
import Fuse from 'fuse.js';

import Toolbar from './navigation/toolbar';
import Navigation from './navigation/index';
import urlQuery from '../utils/url-query';
import {
	isToken, isStem, isTagToken, isFlagToken, getTokenValues, isDependsToken,
	isProvidesToken, getPatterns, filterPatterns
} from './helpers';

class Application extends Component {
	static displayName = 'Application';

	static propTypes = {
		base: types.string.isRequired,
		navigation: types.object.isRequired,
		location: types.object.isRequired,
		config: types.object.isRequired,
		schema: types.object.isRequired,
		children: types.any
	};

	static contextTypes = {
		router: types.any
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
	handleSearch(search) {
		const {props: {location: {pathname, query: passedQuery}}} = this;
		const query = {...passedQuery, search};
		this.context.router.replace({pathname, query});
	}

	render() {
		const {props} = this;
		const {base, location, config, schema} = props;

		const navigation = location.query.search ?
			this.searchPatterns(location.query.search) :
			props.navigation;

		const {query, pathname} = urlQuery.parse(location.pathname);

		return (
			<div className="application">
				<input type="checkbox" id="menu-state" className="menu-state"/>
				<Toolbar
					theme={location.query.theme || config.theme}
					title={config.title || schema.name}
					base={base}
					location={location}
					/>
				<Navigation
					base={base}
					hierarchy={config.hierarchy}
					navigation={navigation}
					onSearch={this.handleSearch}
					path={pathname}
					pathname={pathname}
					query={query}
					location={location}
					searchValue={location.query.search}
					/>
				{this.props.children}
			</div>
		);
	}
}

export default Application;
