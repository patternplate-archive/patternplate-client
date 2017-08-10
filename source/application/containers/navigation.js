import path from 'path';
import frontmatter from 'front-matter';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';
import Navigation from '../components/navigation';

import {listen, themeLoaded, windowResize} from '../actions';

export default connect(mapProps, mapDispatch)(Navigation);

const WEIGHTS = {
	folder: 0,
	doc: 1,
	pattern: 2
};

const selectNavigation = createSelector(
	state => state.schema.meta,
	state => state.config.hierarchy,
	state => state.id,
	(tree, config, id) => sanitize(tree, {config, id, prefix: 'pattern'})
);

const selectDocs = createSelector(
	state => state.schema.docs,
	state => state.id,
	(tree, id) => {
		tree.children.push({
			contents: tree.contents,
			href: '/',
			id: tree.id,
			manifest: tree.manifest,
			path: ['/'],
			type: 'doc'
		});

		return sanitize(tree, {id, prefix: 'doc'});
	}
);

function mapProps(state) {
	return {
		active: state.id,
		docs: selectDocs(state),
		hide: state.hide,
		hierarchy: state.config.hierarchy,
		navigation: selectNavigation(state),
		navigationEnabled: state.navigationEnabled,
		shortcuts: state.shortcuts,
		theme: state.theme
	};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onLoad: () => listen({url: 'api'}),
		onResize: windowResize,
		onThemeLoaded: themeLoaded
	}, dispatch);
}

function sanitize(tree, context) {
	const {id, config = {}, prefix} = context;

	tree.children = tree.children
		.filter(child => child.manifest.options.hidden !== true)
		.map(child => {
			const enriched = enrich(child, {id, config, prefix});
			return enriched.children ? sanitize(enriched, {id, config, prefix}) : enriched;
		})
		.sort((a, b) => {
			const order = (a.manifest.options.order || 0) - (b.manifest.options.order || 0);
			const weight = (WEIGHTS[a.type] || 0) - (WEIGHTS[b.type] || 0);
			const comp = a.manifest.displayName.localeCompare(b.manifest.displayName);

			if (order !== 0) {
				return order;
			}

			if (weight !== 0) {
				return weight;
			}

			return comp;
		});

	return enrich(tree, {id, config, prefix});
}

function enrich(child, {id, config, prefix}) {
	const p = prefix.split('/');
	const fragments = id.split('/').filter((f, i) => p[i] !== f);

	child.active = child.id === 'root' ?
		id === '/' :
		(child.path || ['/']).every((f, i) => fragments[i] === f);

	child.href = child.href || path.join(prefix, child.id);

	if (child.id in config) {
		const o = config[child.id];
		child.manifest.displayName = o.displayName || child.manifest.displayName;
		child.manifest.options.order = o.order || child.manifest.options.order;
		child.manifest.options.icon = o.icon || child.manifest.options.icon;
	}

	// If there is no special content in a folder show the first child
	if (child.children && (!child.contents || !frontmatter(child.contents).body)) {
		child.href = child.children[0].href;
	}

	return child;
}
