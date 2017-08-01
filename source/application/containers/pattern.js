import path from 'path';

import {includes, noop, uniqBy} from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import shortid from 'shortid';

import urlQuery from '../utils/url-query';
import Pattern from '../components/pattern';

import * as actions from '../actions';

export default connect(mapState, mapDispatch)(Pattern);

function mapState(state) {
	return {
		activeSource: state.sourceId || '',
		automount: selectAutomount(state),
		base: state.base,
		breadcrumbs: selectBreadCrumbs(state),
		code: selectCode(state),
		demoContentHeight: selectDemoContentHeight(state),
		demoContentWidth: selectDemoContentWidth(state),
		demoHeight: selectHeight(state),
		demoWidth: selectWidth(state),
		dependencies: selectDependencies(state),
		dependents: selectDependents(state),
		display: selectDisplay(state),
		environment: state.environment,
		environments: selectEnvironments(state),
		errored: selectPatternErrored(state),
		flag: selectFlag(state),
		id: selectId(state),
		loading: selectLoading(state),
		location: selectLocation(state),
		name: selectName(state),
		onDemoReady: selectOnDemoReloaded(state),
		opacity: state.opacity,
		reloadedTime: selectReloadedTime(state),
		reloadTime: selectReloadTime(state),
		rulerLengthX: selectRulerLengthX(state),
		rulerLengthY: selectRulerLengthY(state),
		rulers: state.rulers,
		rulerX: selectRulerXFraction(state),
		rulerY: selectRulerYFraction(state),
		sourceExpanded: state.sourceExpanded,
		tags: selectTags(state),
		version: selectVersion(state)
	};
}

function mapDispatch(dispatch) {
	return bindActionCreators({
		onConcernChange: actions.changeConcern,
		onDemoContentResize: actions.demoContentResize,
		onDemoError: actions.patternDemoError,
		onDemoReady: actions.patternDemoLoaded,
		onDemoScroll: actions.scrollDemo,
		onEnvironmentChange: actions.changeEnvironment,
		onFileRequest: actions.loadPatternFile,
		onMount: () => actions.loadPatternData(),
		onTypeChange: actions.changeType,
		reload: actions.loadPattern,
		resize: actions.resizeDemo
	}, dispatch);
}

function selectWidth(state) {
	const dim = state.demoDimensions[state.id] || {};
	return isNaN(dim.x) ?
		selectWindowWidth(state) / 2 :
		dim.x;
}

function selectHeight(state) {
	const dim = state.demoDimensions[state.id] || {};
	return isNaN(dim.y) ?
		selectWindowHeight(state) / 2 :
		dim.y;
}

function selectDemoContentWidth(state) {
	const dim = state.demoContentDimensions[state.id] || {};
	return dim.width || 0;
}

function selectDemoContentHeight(state) {
	const dim = state.demoContentDimensions[state.id] || {};
	return dim.height || 0;
}

function selectRulerXFraction(state) {
	const length = selectRulerLengthX(state);
	const scrollX = state.scrollDemoX.x;
	return scrollX / (length / 100);
}

function selectRulerYFraction(state) {
	const length = selectRulerLengthY(state);
	const scrollY = state.scrollDemoY.y;
	return scrollY / (length / 100);
}

function selectRulerLengthX(state) {
	const width = selectDemoContentWidth(state);
	const windowWidth = selectWindowWidth(state);
	return width * 2 + Math.abs(windowWidth - width);
}

function selectRulerLengthY(state) {
	const height = selectDemoContentHeight(state);
	const windowHeight = selectWindowHeight(state);
	return height * 2 + Math.abs(windowHeight - height);
}

function selectWindowWidth(state) {
	return (state.window || {}).width || 0;
}

function selectWindowHeight(state) {
	return (state.window || {}).height || 0;
}

function selectBreadCrumbs(state) {
	const fragments = selectId(state).split('/');
	const location = selectLocation(state);

	if (fragments.length < 2) {
		return [];
	}

	return fragments.map((fragment, index) => {
		const partial = fragments.slice(0, index + 1).join('/');
		return {
			id: partial,
			name: fragment,
			navigateable: index < fragments.length - 1,
			target: {
				pathname: `${state.base}pattern/${partial}`,
				query: location.query
			}
		};
	});
}

function selectPattern(state) {
	return state.pattern;
}

function selectManifest(state) {
	const pattern = selectPattern(state);
	return pattern.manifest || {};
}

function selectManifestOptions(state) {
	const manifest = selectManifest(state);
	return manifest.options || {};
}

function selectReactMarkup(state) {
	const options = selectManifestOptions(state);
	return options['react-to-markup'] || {};
}

function selectReactMarkupOptions(state) {
	const markup = selectReactMarkup(state);
	return markup.opts || {};
}

function selectAutomount(state) {
	const opts = selectReactMarkupOptions(state);
	return ('automount' in opts) ? opts.automount : false;
}

function getManifestSelector(name, defaultValue) {
	return state => {
		const manifest = selectManifest(state);
		const value = manifest[name];
		return typeof value === 'undefined' ? defaultValue : value;
	};
}

function selectId(state) {
	return state.id || selectPattern(state).id;
}

function selectName(state) {
	const pattern = selectPattern(state);
	const name = getManifestSelector('name')(state);
	const displayName = getManifestSelector('displayName')(state);
	return displayName || name || pattern.id || '';
}

function selectEnvironments(state) {
	const environments = selectPattern(state).environments || [];
	return environments.map(env => {
		return {
			id: env.name,
			name: env.displayName || env.name
		};
	});
}

function selectFlag(state) {
	return getManifestSelector('flag', '')(state);
}

function selectTags(state) {
	return getManifestSelector('tags', [])(state);
}

function selectVersion(state) {
	return getManifestSelector('version', '')(state);
}

function selectDisplay(state) {
	return getManifestSelector('display', true)(state);
}

function selectDependentPatterns(state) {
	return selectPattern(state).dependents || {};
}

function selectDependents(state) {
	return Object.values(selectDependentPatterns(state))
		.filter(pattern => (pattern.manifest.options || {}).hidden !== true)
		.reduce((registry, pattern) => {
			const navPattern = find(state.navigation, pattern.id) || {manifest: {}};
			const patternEntries = Object.entries(navPattern.manifest.patterns || {});
			const localNames = patternEntries
				.filter(entry => entry[1] === state.id)
				.map(entry => entry[0]);

			const amend = localNames.map(localName => {
				return {
					id: pattern.id,
					name: pattern.manifest.displayName || pattern.manifest.name,
					localName,
					version: pattern.version
				};
			});

			return [...registry, ...amend];
		}, []);
}

function selectDependencies(state) {
	const rootPattern = selectPattern(state);
	return Object.entries(rootPattern.dependencies || {})
		.filter(entry => entry[0] !== 'Pattern')
		.filter(entry => (entry[1].manifest.options || {}).hidden !== true)
		.map(entry => {
			const [localName, pattern] = entry;
			const navPattern = find(state.navigation, pattern.id) || {manifest: {}};

			return {
				id: pattern.id,
				name: navPattern.manifest.displayName || navPattern.manifest.name,
				localName,
				version: navPattern.manifest.version
			};
		});
}

function selectLoading(state) {
	const pattern = selectPattern(state);
	return [
		pattern.dataLoading,
		pattern.demoLoading,
		pattern.sourceLoading
	].some(Boolean);
}

function selectReloadTime(state) {
	const pattern = selectPattern(state);
	return pattern.reloadTime || null;
}

function selectReloadedTime(state) {
	const pattern = selectPattern(state);
	return pattern.reloadedTime || null;
}

function selectLocation(state) {
	return state.routing.locationBeforeTransitions;
}

function selectOnDemoReloaded(state) {
	const pattern = selectPattern(state);
	return pattern.onDemoReloaded || noop;
}

function selectPatternErrors(state) {
	return selectPattern(state).errors || [];
}

function selectPatternErrored(state) {
	const pattern = selectPattern(state);
	return [
		pattern.dataErrored,
		pattern.demoErrored,
		pattern.sourceErrored
	].some(Boolean);
}

function selectCode(state) {
	const pattern = selectPattern(state);
	const sources = pattern.sources || {};
	const files = pattern.files || [];
	const errors = selectPatternErrors(state);

	const formats = uniqBy(files.reduce((registry, file) => {
		return [...registry, {
			id: [pattern.id, file.type].join('/'),
			displayName: file.displayName,
			inExtname: path.extname(file.path),
			outExtname: `.${file.out}`,
			type: file.type,
			in: file.in,
			out: file.out
		}];
	}, []), 'id');

	return (formats || []).map(format => {
		const formatFiles = files.filter(file => file.type === format.type);
		const concerns = formatFiles.map(file => file.concern);

		const hasDemo = includes(concerns, 'demo');
		const defaultConcern = hasDemo ? 'demo' : 'index';
		const parsed = urlQuery.parse(state.sourceId || '');

		const passedConcern = path.basename(parsed.pathname, path.extname(parsed.pathname)) ||
			defaultConcern;

		const isApplicable = includes(concerns, passedConcern);

		const concern = isApplicable ?
			passedConcern :
			defaultConcern;

		const sourceType = format.type === 'documentation' ? 'source' : state.sourceType;
		const language = sourceType === 'source' ? format.in : format.out;
		const extname = format.inExtname;
		const pathname = [pattern.id, `${concern}${extname}`].join('/');
		const types = hasDemo && concern === 'index' ? ['source'] : ['source', 'transformed'];
		const type = hasDemo && concern === 'index' ? 'source' : sourceType;

		const id = urlQuery.format({
			pathname,
			query: {
				type,
				environment: state.environment
			}
		});

		const source = sources[id];
		const active = state.sourceId === id;

		const fileErrors = errors.filter(error => {
			return error.payload ?
				error.payload.id === id :
				error.patternFile === id;
		});

		const update = active &&
			!source &&
			!pattern.sourceLoading &&
			!fileErrors.length;

		return {
			active,
			update,
			extname,
			concern,
			concerns,
			id,
			shortid: shortid(id),
			language,
			name: format.displayName,
			source: source || '',
			type,
			types
		};
	});
}

function find(tree, id, depth = 1) {
	const frags = id.split('/').filter(Boolean);
	const sub = frags.slice(0, depth).map(strip);
	const match = tree.children.find(child => child.path.every((s, i) => sub[i] === strip(s)));

	if (depth < frags.length) {
		return find(match, id, depth + 1);
	}

	return match;
}

function strip(b) {
	return path.basename(b, path.extname(b));
}
