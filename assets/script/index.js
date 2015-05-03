import {client} from '../../application/react-routes/index.jsx';

async function start () {
	let supportsSVG = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
	document.documentElement.classList.toggle('supports-svg', supportsSVG);

	let data = JSON.parse(document.querySelector('[application-state]').textContent);
	await client(data, document.querySelector('[application]'));
}

start();
