// import 'babel-polyfill';
import platform from 'platform';
import {merge} from 'lodash';
import mousetrap from 'mousetrap';

import router from '../../application/react-routes/client';
import {
	closeAllTheThings, toggleExpandMenu, toggleTheme, reloadPattern
} from '../../application/actions';

const select = global.document.querySelector.bind(global.document);

function main() {
	const vault = select('[data-application-state]');
	const slot = select('[data-application]');
	const data = getData(vault);
	const app = router(data, slot);
	bind(app);
}

main();

function bind(app) {
	const {store: {dispatch}} = app;

	mousetrap.bind('ctrl+e', () => {
		dispatch(toggleExpandMenu());
	});

	mousetrap.bind('ctrl+r', () => {
		dispatch(reloadPattern());
	});

	mousetrap.bind('ctrl+t', () => {
		dispatch(toggleTheme());
	});

	mousetrap.bind('esc', () => {
		dispatch(closeAllTheThings());
	});
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
