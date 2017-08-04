import {loadPattern, loadSchema} from './';

export default reload;

function reload() {
	return async dispatch => {
		const actions = [
			async () => dispatch(await loadSchema()),
			loadPattern({reloadTime: Date.now()})
		];

		await Promise.all(actions.map(dispatch));
	};
}
