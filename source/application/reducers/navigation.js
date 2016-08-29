import path from 'path';
import {merge, zipObjectDeep} from 'lodash';

import {getPatternData} from '../actions';
import {handlePromiseThunkAction} from '../actions/promise-thunk-action';
import navigate from '../utils/navigate';

const handlePatternLoad = handlePromiseThunkAction(getPatternData, {
	success(state, {payload}) {
		const match = navigate(payload.id, state);
		if (match) {
			const fragments = payload.id.split('/');

			const entities = fragments.map((fragment, index) => {
				return navigate(fragments.slice(0, index + 1).join('/'), state);
			});

			const entityPath = entities.reduce((registry, entity) => {
				const id = path.basename(entity.id);
				const amend = entity.type === 'folder' ?
					[id, 'children'] :
					[id];
				return [...registry, ...amend];
			}, []).join('.');

			const data = merge({}, match, {
				dependencies: payload.dependencies,
				dependents: payload.dependents,
				display: payload.display,
				environments: payload.environments,
				files: payload.files,
				id: payload.id,
				manifest: {
					displayName: payload.manifest.displayName,
					flag: payload.manifest.flag,
					tags: payload.manifest.tags,
					name: payload.manifest.name,
					version: payload.manifest.version
				}
			});
			const envelope = zipObjectDeep([entityPath], [data]);
			return merge({}, state, envelope);
		}
		return state;
	}
}, {});

export default handlePatternLoad;
