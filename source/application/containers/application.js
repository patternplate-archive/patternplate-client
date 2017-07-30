import frontmatter from 'front-matter';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Application from '../components/application';

import {listen, search, themeLoaded, toggleSearchFocus, toggleTheme, windowResize} from '../actions';

export default connect(mapProps, mapDispatch)(Application);

function mapProps(state, own) {
	return {
		activePattern: state.id,
		base: state.base,
		description: selectDescription(state),
		depth: state.depth,
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
		search: own.location.query.search,
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
		onLoad: listen,
		onResize: windowResize,
		onSearch: search,
		onThemeLoaded: themeLoaded,
		onThemeChange: toggleTheme,
		requestSearchBlur: () => toggleSearchFocus(false)
	}, dispatch);
}

function selectDocs(state) {
	return {
		id: state.schema.docs.id,
		contents: state.schema.docs.contents,
		children: selectChildren(state.schema.docs.children),
		manifest: state.schema.docs.manifest
	};
}

function selectNavigation(state) {
	return {
		children: selectChildren(state.navigation.children)
	};
}

const WEIGHTS = {
	folder: 0,
	doc: 1,
	pattern: 2
};

function selectChildren(children) {
	return children
		.filter(child => child.manifest.options.hidden !== false)
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

			c.children = selectChildren(c.children);
			const body = frontmatter(c.contents || '').body;

			if (c.children.length > 0 && !body) {
				c.to = c.children[0].id;
			}

			return c;
		});
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
