import {client} from '../../application/react-routes/index.jsx';

async function start () {
	let data = JSON.parse(document.querySelector('[application-state]').textContent);
	await client(data, document.querySelector('[application]'));
}

start();
