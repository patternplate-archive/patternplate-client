import 'dom4';
import platform from 'platform';
import {merge} from 'lodash';

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

	global.addEventListener('keydown', e => {
		const ctrl = e.ctrlKey;
		const code = e.data ? e.data.keyCode : e.keyCode;

		if (ctrl && code === 67) { // ctrl+c
			dispatch(actions.toggleConsole());
		}

		if (ctrl && code === 68) { // ctrl+d
			dispatch(actions.openDocumentation());
		}

		if (ctrl && code === 69) { // ctrl+e
			dispatch(actions.toggleExpandMenu());
		}

		if (ctrl && code === 70) { // ctrl+f
			dispatch(actions.openFullscreen());
		}

		if (ctrl && code === 73) { // ctrl+i
			dispatch(actions.toggleIssue());
		}

		if (ctrl && code === 79) { // ctrl+o
			dispatch(actions.toggleOpacity());
		}

		if (ctrl && code === 75) { // ctrl+k
			dispatch(actions.toggleKeyboardShortcuts());
		}

		if (ctrl && code === 76) { // ctrl+l
			dispatch(actions.toggleRulers());
		}

		if (ctrl && code === 82) { // ctrl+r
			dispatch(actions.loadPattern());
		}

		if (ctrl && code === 32) { // ctrl+space
			dispatch(actions.toggleSearchFocus());
		}

		if (ctrl && code === 84) { // ctrl+t
			dispatch(actions.toggleTheme());
		}

		if (code === 27) { // esc
			dispatch(actions.closeAllTheThings());
		}
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
