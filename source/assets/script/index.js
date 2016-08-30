// import 'babel-polyfill';
import platform from 'platform';
import router from '../../application/react-routes/client';

const select = global.document.querySelector.bind(global.document);

function main() {
	const vault = select('[data-application-state]');
	const slot = select('[data-application]');
	const data = JSON.parse(vault.textContent);
	data.schema.clientRuntimeName = platform.name;
	data.schema.clientRuntimeVersion = platform.version;
	data.schema.clientOsName = platform.os.name;
	data.schema.clientOsVersion = platform.os.version;
	return router(data, slot);
}

main();
