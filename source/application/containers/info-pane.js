import {values} from 'lodash';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

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

const selectDemoDependencies = createSelector(
	selectItem,
	selectFilter,
	(item, filter) => item ? values(item.demoDependencies).filter(filter) : []
);

const selectDemoDependents = createSelector(
	selectItem,
	selectFilter,
	(item, filter) => item ? values(item.demoDependents).filter(filter) : []
);

const selectDependencies = createSelector(
	selectItem,
	selectFilter,
	item => item ? values(item.dependencies).filter(filter) : []
);

const selectDependents = createSelector(
	selectItem,
	selectFilter,
	item => item ? values(item.dependents).filter(filter) : []
);

const selectManifest = createSelector(
	selectItem,
	item => item ? JSON.stringify(item.manifest, null, '  ') : ''
);

function mapProps(state) {
	return {
		active: selectActive(state),
		demoDependencies: selectDemoDependencies(state),
		demoDependents: selectDemoDependents(state),
		dependencies: selectDependencies(state),
		dependents: selectDependents(state),
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

export default withToggleStates(connect(mapProps)(InfoPane));

function filter(hidden) {
	return hidden ? item => (item.manifest.options || {}).hidden !== true : i => i;
}
