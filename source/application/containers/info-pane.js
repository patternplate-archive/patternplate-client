import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import * as actions from '../actions';
import createRelationSelector from '../selectors/relation';
import find from '../utils/find';
import InfoPane from '../components/info-pane';
import selectPatterns from '../selectors/navigation';
import selectDocs from '../selectors/docs';
import withToggleStates from '../connectors/with-toggle-states';

const selectType = createSelector(
	state => state.id,
	id => id.split('/').find(f => typeof f === 'string' && f)
);

const selectItem = createSelector(
	selectDocs,
	selectPatterns,
	selectType,
	state => state.id,
	(docs, patterns, type, id) => {
		switch (type) {
			case 'pattern':
				return find(patterns, id, {type});
			case 'doc':
				return find(docs, id, {type});
			default:
				return null;
		}
	});

const selectActive = createSelector(
	selectItem,
	state => state.searchEnabled,
	(item, search) => !search && item !== null && typeof item !== 'undefined'
);

const selectIcon = createSelector(
	selectItem,
	item => item ? item.manifest.icon || item.type : ''
);

const selectName = createSelector(
	selectItem,
	item => item ? item.manifest.displayName : ''
);

const selectTags = createSelector(
	selectItem,
	item => item ? item.manifest.tags : []
);

const selectVersion = createSelector(
	selectItem,
	item => item ? item.manifest.version : ''
);

const selectFlag = createSelector(
	selectItem,
	item => item ? item.manifest.flag : ''
);

const selectFilter = createSelector(
	state => state.hide,
	hide => filter(hide)
);

const relation = key => createRelationSelector(key, selectItem, selectFilter);

const selectDemoDependencies = relation('demoDependencies');
const selectDemoDependents = relation('demoDependents');
const selectDependencies = relation('dependencies');
const selectDependents = relation('dependents');

const selectManifest = createSelector(
	selectItem,
	item => item ? JSON.stringify(item.manifest, null, '  ') : ''
);

const selectEnv = createSelector(
	state => state.environment,
	state => state.schema.envs,
	(env, envs) => {
		const found = envs.find(e => e.name === env);
		return {
			name: found.name,
			displayName: found.displayName
		};
	}
);

const selectEnvs = createSelector(
	selectItem,
	state => state.schema.envs,
	(item, envs) => {
		if (!item) {
			return [];
		}

		return item.envs.map(e => {
			const found = envs.find(env => env.name === e);
			return {
				name: found.name,
				displayName: found.displayName
			};
		});
	}
);

function mapProps(state) {
	return {
		active: selectActive(state),
		demoDependencies: selectDemoDependencies(state),
		demoDependents: selectDemoDependents(state),
		dependencies: selectDependencies(state),
		dependents: selectDependents(state),
		env: selectEnv(state),
		envs: selectEnvs(state),
		flag: selectFlag(state),
		id: state => state.id,
		icon: selectIcon(state),
		type: selectType(state),
		name: selectName(state),
		manifest: selectManifest(state),
		tags: selectTags(state),
		version: selectVersion(state)
	};
}

export function mapDispatch(dispatch) {
	return bindActionCreators({
		onEnvChange: e => actions.changeEnvironment(e.target.value)
	}, dispatch);
}
export default withToggleStates(connect(mapProps, mapDispatch)(InfoPane));

function filter(hidden) {
	return hidden ? item => (item.manifest.options || {}).hidden !== true : i => i;
}
