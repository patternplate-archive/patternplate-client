import {patchLocation} from './';

export default openDocumentation;
export const type = 'OPEN_DOCUMENTATION';

function openDocumentation() {
	return dispatch => {
		const pathname = '/';
		dispatch(patchLocation({pathname}));
	};
}

openDocumentation.type = type;
