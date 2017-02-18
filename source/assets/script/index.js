import platform from 'platform';
import {merge} from 'lodash';

import './polyfills';
import router from '../../application/react-routes/client';
import * as actions from '../../application/actions';

const {document, location} = global;

main();

function main() {
	const vault = document.query('[data-application-state]');
	const slot = document.query('[data-application]');
	const data = getData(vault);

	// For static builds, purge the app mount point before
	// attaching to avoid react warning
	if (data.startPathname !== location.pathname) {
		empty(slot);
	}

	bind(router(data, slot));
}

function bind(app) {
	const {store: {dispatch}} = app;

	global.addEventListener('keydown', e => {
		// Using ctrl + alt here due to OS differnces (e.g. ctrl + c)
		const modifier = e.ctrlKey && e.altKey;
		const code = e.data ? e.data.keyCode : e.keyCode;

		if (modifier && code === 67) { // ctrl+alt+c
			dispatch(actions.toggleConsole());
		}

		if (modifier && code === 68) { // ctrl+alt+d
			dispatch(actions.openDocumentation());
		}

		if (modifier && code === 69) { // ctrl+alt+e
			dispatch(actions.toggleExpandMenu());
		}

		if (modifier && code === 70) { // ctrl+alt+f
			dispatch(actions.openFullscreen());
		}

		if (modifier && code === 72) { // ctrl+alt+h
			dispatch(actions.toggleHide());
		}

		if (modifier && code === 73) { // ctrl+alt+i
			dispatch(actions.toggleIssue());
		}

		if (modifier && code === 79) { // ctrl+alt+o
			dispatch(actions.toggleOpacity());
		}

		if (modifier && code === 75) { // ctrl+alt+k
			dispatch(actions.toggleKeyboardShortcuts());
		}

		if (modifier && code === 76) { // ctrl+alt+l
			dispatch(actions.toggleRulers());
		}

		if (modifier && code === 82) { // ctrl+alt+r
			dispatch(actions.loadPattern());
		}

		if (modifier && code === 32) { // ctrl+alt+space
			dispatch(actions.toggleSearchFocus());
		}

		if (modifier && code === 84) { // ctrl+alt+t
			dispatch(actions.toggleTheme());
		}

		if (code === 27) { // esc
			dispatch(actions.closeAllTheThings());
		}
	});
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
