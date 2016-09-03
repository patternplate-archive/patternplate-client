// import 'babel-polyfill';
import platform from 'platform';
import {merge} from 'lodash';
import mousetrap from 'mousetrap';

import router from '../../application/react-routes/client';
import * as actions from '../../application/actions';

const select = global.document.querySelector.bind(global.document);

main();

function main() {
	const vault = select('[data-application-state]');
	const slot = select('[data-application]');
	const data = getData(vault);
	const app = router(data, slot);
	bind(app);
}

function bind(app) {
	const {store: {dispatch}} = app;
	const binder = bindDispatch(dispatch);
	binder('ctrl+c', actions.toggleConsole());
	binder('ctrl+d', actions.openDocumentation());
	binder('ctrl+e', actions.toggleExpandMenu());
	binder('ctrl+f', actions.openFullscreen());
	binder('ctrl+i', actions.toggleIssue());
	binder('ctrl+r', actions.loadPattern());
	binder('ctrl+t', actions.toggleTheme());
	binder('esc', actions.closeAllTheThings());
}

function bindDispatch(dispatch) {
	return (event, action) => {
		mousetrap.bind(event, () => dispatch(action));
	};
}

function getData(vault) {
	const platformData = getPlatformData();
	const vaultData = JSON.parse(vault.textContent);
	return merge({}, vaultData, {schema: platformData});
}

function getPlatformData() {
	return {
		clientRuntimeName: platform.name,
		clientRuntimeVersion: platform.version,
		clientOsName: platform.os.name,
		clientOsVersion: platform.os.version
	};
}
