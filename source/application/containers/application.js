import frontmatter from 'front-matter';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';
import Application from '../components/application';

import {listen, themeLoaded, windowResize} from '../actions';

export default connect(mapProps, mapDispatch)(Application);

const WEIGHTS = {
	folder: 0,
	doc: 1,
	pattern: 2
};

const selectChildren = config => createSelector(
	r => r.docs ? r.docs.children : r.children,
	children => {
		return children
			.filter(child => child.manifest.options.hidden !== false)
			.map(child => {
				if (child.id in config.hierarchy) {
					const o = config.hierarchy[child.id];
					child.manifest.displayName = o.displayName || child.manifest.displayName;
					child.manifest.options.order = o.order || child.manifest.options.order;
					child.manifest.options.icon = o.icon || child.manifest.options.icon;
				}
				return child;
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
			})
			.map(c => {
				if (!c.children) {
					return c;
				}

				c.children = selectChildren(config)(c);
				const body = frontmatter(c.contents || '').body;

				if (c.children.length > 0 && !body) {
					c.to = c.children[0].id;
				}

				return c;
			});
	}
);

const selectDocs = createSelector(
	state => state.schema.docs.id,
	state => state.schema.docs.contents,
	state => selectChildren(state.config.hierarchy)(state.schema),
	state => state.schema.docs.manifest || {displayName: 'Documentation'},
	(id, contents, children, manifest) => ({id, contents, children, manifest})
);

const selectMeta = createSelector(
	selectSchema,
	schema => schema.meta
);

const selectNavigation = createSelector(
	state => selectMeta(state),
	state => state.config,
	(meta, config) => {
		return {children: selectChildren(config)(meta)};
	}
);

function mapProps(state, own) {
	return {
		activePattern: state.id,
		base: state.base,
		depth: state.depth,
		description: selectDescription(state),
		docs: selectDocs(state),
		expanded: state.expanded,
		hide: state.hide,
		hierarchy: state.config.hierarchy,
		issue: state.issue,
		lightbox: state.lightbox,
		logo: state.config.logo || 'patternplate',
		menuEnabled: state.menuEnabled,
		navigation: selectNavigation(state),
		pathname: own.location.pathname,
		query: own.location.query,
		searchEnabled: state.searchEnabled,
		shortcuts: state.shortcuts,
		startBase: state.startBase,
		styles: state.styles,
		theme: state.theme,
		themeLoading: selectThemeLoading(state),
		title: state.config.title || state.schema.name,
		version: selectVersion(state)
	};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onLoad: () => listen({url: 'api'}),
		onResize: windowResize,
		onThemeLoaded: themeLoaded
	}, dispatch);
}

function selectDescription(state) {
	return selectSchema(state).description || '';
}

function selectVersion(state) {
	return selectSchema(state).version || '';
}

function selectSchema(state) {
	return state.schema || {};
}

function selectThemeLoading(state) {
	return state.styles.length > 1;
}
