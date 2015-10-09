import {render} from 'react-dom';
import Application from '../../universal/client';

const queries = {
	mount: '[data-mount-node]',
	data: '[data-mount-data]'
};

async function main() {
	const mountElement = document.querySelector(queries.mount);
	const dataElement = document.querySelector(queries.data);

	if (!mountElement) {
		throw new Error('No mount point found, searched for');
	}

	console.log(mountElement);
	console.log(dataElement);
}

main()
	.catch(err => console.error(err));
