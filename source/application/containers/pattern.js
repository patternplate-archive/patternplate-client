import path from 'path';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {uniqBy} from 'lodash';

import urlQuery from '../utils/url-query';
import navigate from '../utils/navigate';
import Pattern from '../components/pattern';
import reloadPattern from '../actions/reload-pattern';
import getPatternFile from '../actions/get-pattern-file';

export default connect(mapState, mapDispatch)(Pattern);

function mapState(state) {
	return {
		activeSource: state.sourceId || '',
		base: state.base,
		code: selectCode(state),
		dependencies: selectDependencies(state),
		dependents: selectDependents(state),
		display: selectDisplay(state),
		environment: state.environment,
		environments: selectEnvironments(state),
		flag: selectFlag(state),
		id: selectId(state),
		loading: selectLoading(state),
		location: selectLocation(state),
		name: selectName(state),
		reloading: selectReloading(state),
		reloadTime: selectReloadTime(state),
		sourceExpanded: state.sourceExpanded,
		tags: selectTags(state),
		version: selectVersion(state)
	};
}

function mapDispatch(dispatch, own) {
	const {location} = own;
	return bindActionCreators({
		onConcernChange: e => {
			const previous = location.query.source;
			const next = e.target.value;
			return push({
				pathname: location.pathname,
				query: {
					...location.query,
					source: `${path.dirname(previous)}/${next}${path.extname(previous)}`
				}
			});
		},
		onEnvironmentChange: e => {
			const parsed = urlQuery.parse(location.pathname);
			const pathname = urlQuery.format({
				...parsed,
				query: {
					environment: e.target.value
				}
			});
			return push({
				pathname,
				query: location.query
			});
		},
		onFileRequest: getPatternFile,
		reload: () => {
			return reloadPattern();
		},
		onTypeChange: e => {
			const value = e.target.value;
			const sourceType = ['source', 'transformed'].includes(value) ?
				value :
				'source';

			return push({
				pathname: location.pathname,
				query: {
					...location.query,
					'source-type': sourceType
				}
			});
		}
	}, dispatch);
}

function selectPattern(state) {
	return state.pattern ||
		navigate(state.id, state.navigation) ||
		{};
}

function selectManifest(state) {
	const pattern = selectPattern(state);
	return pattern.manifest || {};
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
	return name || displayName || pattern.id || '';
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
		.filter(pattern => pattern.display)
		.reduce((registry, pattern) => {
			const navPattern = navigate(pattern.id, state.navigation) || {manifest: {}};
			const patternEntries = Object.entries(navPattern.manifest.patterns);
			const localNames = patternEntries
				.filter(entry => entry[1] === state.id)
				.map(entry => entry[0]);

			const amend = localNames.map(localName => {
				return {
					id: pattern.id,
					name: pattern.displayName || pattern.name,
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
		.map(entry => {
			const [localName, pattern] = entry;
			const navPattern = navigate(pattern.id, state.navigation) || {manifest: {}};

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
	return pattern.loading || true;
}

function selectReloading(state) {
	const pattern = selectPattern(state);
	return pattern.reloading || false;
}

function selectReloadTime(state) {
	const pattern = selectPattern(state);
	return pattern.reloadTime || null;
}

function selectLocation(state) {
	return state.routing.locationBeforeTransitions;
}

function selectCode(state) {
	const pattern = selectPattern(state);
	const sources = pattern.sources || {};
	const files = pattern.files || [];

	const formats = uniqBy(files.reduce((registry, file) => {
		return [...registry, {
			id: [pattern.id, file.type].join('/'),
			displayName: file.displayName,
			type: file.type,
			in: path.extname(file.id).slice(1),
			out: file.out
		}];
	}, []), 'id');

	return formats.map(format => {
		const formatFiles = files.filter(file => file.type === format.type);
		const concerns = formatFiles.map(file => file.concern);

		const hasDemo = concerns.includes('demo');
		const defaultConcern = hasDemo ? 'demo' : 'index';
		const isPassable = state.sourceId && path.dirname(state.sourceId) === state.id;

		const passedConcern = isPassable ?
			path.basename(state.sourceId, path.extname(state.sourceId)) :
			defaultConcern;

		const isApplicable = concerns.includes(passedConcern);

		const concern = isApplicable ?
			passedConcern :
			defaultConcern;

		const id = [pattern.id, `${concern}.${format.in}`].join('/');
		const source = sources[id];
		const sourceType = format.type === 'documentation' ? 'source' : state.sourceType;

		return {
			active: state.sourceId === id,
			loading: false,
			concern,
			concerns,
			id,
			language: format.in,
			name: format.displayName,
			source: source || '',
			type: sourceType,
			types: ['source', 'transformed']
		};
	});
}
