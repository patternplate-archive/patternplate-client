import 'babel-polyfill';
import {client} from '../../source/application/react-routes';

const document = global.document;

async function start() {
	const supportsSVG = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
	document.documentElement.classList.toggle('supports-svg', supportsSVG);

	const data = JSON.parse(document.querySelector('[data-application-state]').textContent);
	await client(data, document.querySelector('[data-application]'));
}

start()
	.catch(error => {
		console.error(error);
		console.trace(error.stack);
	});
