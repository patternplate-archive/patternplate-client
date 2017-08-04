import platform from 'platform';
import {merge} from 'lodash';

import './polyfills';
import router from '../../application/react-routes/client';

const {document, location} = global;

main();

function main() {
	const vault = document.query('[data-application-state]');
	const slot = document.query('[data-application]');
	const data = getData(vault);

	// For static builds, purge the app mount point before
	// attaching to avoid React warning
	if (data.startPathname !== location.pathname) {
		empty(slot);
	}

	router(data, slot);
}

function getData(vault) {
	const platformData = getPlatformData();
	const windowData = getWindowData();
	const vaultData = JSON.parse(vault.textContent);
	return merge({}, vaultData, windowData, {schema: platformData});
}

function getPlatformData() {
	return {
		clientRuntimeName: platform.name,
		clientRuntimeVersion: platform.version,
		clientOsName: platform.os.name,
		clientOsVersion: platform.os.version
	};
}

function getWindowData() {
	return {
		window: {
			width: global.innerWidth,
			height: global.innerHeight
		}
	};
}

function empty(el) {
	while (el.lastChild) {
		el.lastChild.remove();
	}
}
