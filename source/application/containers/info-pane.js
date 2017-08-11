import {values} from 'lodash';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import find from '../utils/find';
import InfoPane from '../components/info-pane';

const selectId = state => state.id;
const selectDocs = state => state.schema.docs;
const selectPatterns = state => state.schema.meta;

const selectType = createSelector(
	selectId,
	id => id.split('/').find(f => typeof f === 'string' && f)
);

const selectItem = createSelector(
	selectDocs,
	selectPatterns,
	selectType,
	selectId,
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
	item => item !== null && typeof item !== 'undefined'
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

const selectDependencies = createSelector(
	selectItem,
	item => item ? values(item.dependencies).filter(i => (i.manifest.option || {}).hidden !== true) : []
);

const selectDependents = createSelector(
	selectItem,
	item => item ? values(item.dependents).filter(i => (i.manifest.option || {}).hidden !== true) : []
);

function mapProps(state) {
	return {
		active: selectActive(state),
		dependencies: selectDependencies(state),
		dependenciesEnabled: state.dependenciesEnabled,
		dependents: selectDependents(state),
		dependentsEnabled: state.dependentsEnabled,
		flag: selectFlag(state),
		id: selectId(state),
		icon: selectIcon(state),
		type: selectType(state),
		name: selectName(state),
		tags: selectTags(state),
		version: selectVersion(state)
	};
}

export default connect(mapProps)(InfoPane);
